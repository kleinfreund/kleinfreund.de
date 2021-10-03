const path = require("path");
const fs = require("fs");

const CleanCSS = require("clean-css");
const htmlMinifier = require("html-minifier");
const makeSynchronous = require("make-synchronous");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

// https://github.com/kangax/html-minifier#options-quick-reference
const htmlMinifierOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
};

// https://github.com/markdown-it/markdown-it#init-with-presets-and-options
const markdownItOptions = {
  html: true,
};

// https://github.com/valeriangalliat/markdown-it-anchor#usage
const markdownItAnchorOptions = {
  permalink: markdownItAnchor.default.permalink.linkInsideHeader({
    symbol: `
      <span class="header-anchor__icon">
        <span aria-label="Link Symbol" role="img">🔗</span>
        <span class="visually-hidden">Jump to heading</span>
      </span>
    `.trim(),
    placement: 'before',
  }),
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  });

  eleventyConfig.setDataDeepMerge(true);

  // Copies static files to the output directory
  eleventyConfig
    .addPassthroughCopy("src/img")
    .addPassthroughCopy("src/css")
    .addPassthroughCopy("src/js")
    .addPassthroughCopy("src/favicon.ico")
    .addPassthroughCopy("src/.htaccess")
    .addPassthroughCopy("src/manifest.webmanifest");

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAnchor.default, markdownItAnchorOptions);
  eleventyConfig.setLibrary("md", markdownLib);

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode("excerpt", (post) => extractExcerpt(post));

  // Filter for compressing CSS
  eleventyConfig.addFilter("resolve_css_imports", resolveCssImports);
  eleventyConfig.addFilter("minify_css", minifyCss);
  eleventyConfig.addFilter("minify_js", minifyJs);

  // Compresses output HTML
  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("minify_html", minifyHtml);
  }

  return {
    dir: {
      input: "src",
      // Make the project directory the includes directory. This allows me to include files from
      // across the project instead of just a dedicated includes directory.
      includes: "",
    },
    templateFormats: ["md", "liquid", "html"],
  };
};

/**
 * @param {string} mainCssPath
 * @returns {string}
 */
function resolveCssImports(mainCssPath) {
  const mainCssContent = fs.readFileSync(path.join("src", mainCssPath), "utf8");
  const importRules = mainCssContent
    .split("\n")
    .filter((line) => line.startsWith("@import"));
  const importPaths = importRules.map((importRule) => {
    return path.join(
      "src",
      importRule.replace(/@import ['"]/, "").replace(/['"];/, "")
    );
  });

  let concatenatedCssContent = "";
  for (const importPath of importPaths) {
    concatenatedCssContent += fs.readFileSync(importPath, "utf8");
  }

  return concatenatedCssContent;
}

/**
 * Minifies CSS content.
 *
 * @param {string} concatenatedCssContent
 * @returns {string} the minified CSS content
 */
function minifyCss(concatenatedCssContent) {
  const minifyResult = new CleanCSS().minify(concatenatedCssContent);

  if (minifyResult.errors.length > 0) {
    console.error("❌ Could not minify CSS.");

    for (const error of minifyResult.errors) {
      console.error("❌", error);
    }

    return concatenatedCssContent;
  }

  return minifyResult.styles;
}

/**
 * Minifies HTML content.
 *
 * @param {string} content
 * @param {string} outputPath
 * @returns {string} the minified HTML content
 */
function minifyHtml(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    return htmlMinifier.minify(content, htmlMinifierOptions);
  }

  return content;
}

/**
 * Extracts the excerpt from a document.
 *
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {string} the excerpt.
 */
function extractExcerpt(doc) {
  if (!doc.hasOwnProperty("templateContent")) {
    console.warn(
      "❌ Failed to extract excerpt: Document has no property `templateContent`."
    );
    return;
  }

  const excerptSeparator = "<!--more-->";
  const content = doc.templateContent;

  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator)).trim();
  }

  const pCloseTag = "</p>";
  if (content.includes(pCloseTag)) {
    return content.substring(0, content.indexOf(pCloseTag) + pCloseTag.length);
  }

  return content;
}

async function minifyJsAsync(content) {
  try {
    const { minify } = require("terser");
    const result = await minify(content)
    return result.code
  } catch (error) {
    console.error("❌", error)
  }
}

function minifyJs(content) {
  // Eleventy currently doesn’t support asynchronous universal filters.
  return makeSynchronous(minifyJsAsync)(content)
}
