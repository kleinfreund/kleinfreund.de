const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');
const markdownIt = require('markdown-it');

// https://github.com/kangax/html-minifier#options-quick-reference
const htmlMinifierOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true
};

// https://github.com/markdown-it/markdown-it#init-with-presets-and-options
const markdownItOptions = {
  html: true
};

// https://github.com/valeriangalliat/markdown-it-anchor#usage
const markdownItAnchorOptions = {
  permalink: true,
  permalinkSymbol: '🔗'
};

module.exports = function (eleventyConfig) {
  // Copies static files as they are to the output directory
  eleventyConfig
    .addPassthroughCopy('img')
    .addPassthroughCopy('css')
    .addPassthroughCopy('favicon.ico')
    .addPassthroughCopy('.htaccess')
    .addPassthroughCopy('manifest.webmanifest');

  const markdownLib = markdownIt(markdownItOptions)
    .use(require('markdown-it-anchor'), markdownItAnchorOptions);
  eleventyConfig.setLibrary('md', markdownLib);

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

  // Filter for compressing CSS
  eleventyConfig.addFilter('cssmin', code => new CleanCSS().minify(code).styles);

  // Compresses output HTML
  eleventyConfig.addTransform('htmlmin', minifyHtml);

  // #147: Can’t use collection.posts because front matter overrides json file
  // #194: Reverse pagination
  eleventyConfig.addCollection('allposts', collection => {
    return collection.getFilteredByGlob('./posts/**/*').reverse();
  });

  return {
    templateFormats: ['md', 'html', 'liquid']
  };
};

/**
 * Minifies HTML content.
 *
 * @param {String} content
 * @param {String} outputPath
 * @returns {String} the minified HTML content
 */
function minifyHtml(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    return htmlMinifier.minify(content, htmlMinifierOptions);
  }

  return content;
}

/**
 * Extracts the excerpt from a document.
 *
 * @param {*} doc A real big object full of all sorts of information about a document.
 * @returns {String} the excerpt.
 */
function extractExcerpt(doc) {
  if (!doc.hasOwnProperty('templateContent')) {
    console.warn('❌ Failed to extract excerpt: Document has no property `templateContent`.');
    return;
  }

  const excerptSeparator = '<!--more-->';
  const content = doc.templateContent;

  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator)).trim();
  }

  if (content.includes('</p>')) {
    return content.substring(0, content.indexOf('</p>') + 4);
  }

  return content;
}
