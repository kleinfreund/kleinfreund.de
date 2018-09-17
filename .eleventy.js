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
    .addPassthroughCopy('src/img')
    .addPassthroughCopy('src/css')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/.htaccess')
    .addPassthroughCopy('src/manifest.webmanifest');

  const markdownLib = markdownIt(markdownItOptions)
    .use(require('markdown-it-anchor'), markdownItAnchorOptions);
  eleventyConfig.setLibrary('md', markdownLib);

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

  // Filter for compressing CSS
  eleventyConfig.addFilter('minify_css', minifyCss);

  // Compresses output HTML
  eleventyConfig.addTransform('minify_html', minifyHtml);

  // #147: Can’t use collection.posts because front matter overrides json file
  // #194: Reverse pagination
  eleventyConfig.addCollection('allposts', collection => {
    return collection.getFilteredByGlob('./src/posts/**/*').reverse();
  });

  return {
    dir: {
      input: 'src',
      // This enables me to include files from the `/css` directory by making `/` the include
      // directory.
      includes: ''
    },
    templateFormats: ['md', 'liquid']
  };
};

/**
 * Minifies CSS content.
 *
 * @param {String} content
 * @returns {String} the minified CSS content
 */
function minifyCss(content) {
  const cleanCss = new CleanCSS();

  const minifyResult = cleanCss.minify(content);

  if (minifyResult.errors.length > 0) {
    console.error('Could not minify CSS.');
    minifyResult.errors.forEach(error => { console.error('>', error) });

    return content;
  }

  return minifyResult.styles;
}

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
