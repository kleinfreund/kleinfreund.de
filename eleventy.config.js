const { minify } = require('terser')
const CleanCSS = require('clean-css')
const fs = require('fs')
const htmlMinifier = require('html-minifier')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const path = require('path')
const pluginRss = require('@11ty/eleventy-plugin-rss')

/**
 * https://github.com/kangax/html-minifier#options-quick-reference
 *
 * @type {import('html-minifier').Options}
 */
const htmlMinifierOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
}

/**
 * https://github.com/markdown-it/markdown-it#init-with-presets-and-options
 *
 * @type {import('markdown-it').Options}
 */
const markdownItOptions = {
  html: true,
}

/**
 * https://github.com/valeriangalliat/markdown-it-anchor#usage
 *
 * @type {import('markdown-it-anchor').default.AnchorOptions}
 */
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
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true,
  })

  eleventyConfig.setDataDeepMerge(true)

  // Copies static files to the output directory
  eleventyConfig
    .addPassthroughCopy('src/img')
    .addPassthroughCopy('src/css')
    .addPassthroughCopy('src/js')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/.htaccess')
    .addPassthroughCopy('src/manifest.webmanifest')

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAnchor.default, markdownItAnchorOptions)
  eleventyConfig.setLibrary('md', markdownLib)

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode('excerpt', (post) => extractExcerpt(post))

  // Filters for compressing CSS
  eleventyConfig.addFilter('resolve_css_imports', resolveCssImports)
  eleventyConfig.addFilter('minify_css', minifyCss)
  eleventyConfig.addFilter('minify_js', minifyJs)

  // Compresses output HTML
  if (process.env.NODE_ENV === 'production') {
    eleventyConfig.addTransform('minify_html', minifyHtml)
  }

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addFilter('absoluteUrl', pluginRss.absoluteUrl)
  eleventyConfig.addLiquidFilter('convertHtmlToAbsoluteUrls', pluginRss.convertHtmlToAbsoluteUrls)
  eleventyConfig.addFilter('dateToRfc3339', pluginRss.dateToRfc3339)
  eleventyConfig.addFilter('getNewestCollectionItemDate', pluginRss.getNewestCollectionItemDate)

  return {
    dir: {
      input: 'src',
      // Makes the project directory the includes directory. This allows me to include files from
      // across the project instead of just a dedicated includes directory.
      includes: '',
    },
    templateFormats: ['md', 'liquid', 'html'],
  }
}

/**
 * @param {string} cssPath
 * @returns {string} the concatenated contents of the CSS files found by resolving `@import` rules in the CSS file at `cssPath`.
 */
function resolveCssImports(cssPath) {
  return fs.readFileSync(path.resolve(__dirname, path.join('src', cssPath)), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.startsWith('@import'))
    .map((rule) => rule.replace(/@import ['"]/, '').replace(/['"];/, ''))
    .map((importPath) => fs.readFileSync(path.resolve(__dirname, path.join('src', importPath)), 'utf8'))
    .join('')
}

/**
 * Minifies CSS content.
 *
 * @param {string} concatenatedCssContent
 * @returns {string} the minified CSS content
 */
function minifyCss(concatenatedCssContent) {
  const minifyResult = new CleanCSS().minify(concatenatedCssContent)

  if (minifyResult.errors.length > 0) {
    console.error('❌ Could not minify CSS.')

    for (const error of minifyResult.errors) {
      console.error('❌', error)
    }

    return concatenatedCssContent
  }

  return minifyResult.styles
}

/**
 * Minifies HTML content.
 *
 * @param {string} content
 * @param {string} outputPath
 * @returns {string} the minified HTML content
 */
function minifyHtml(content, outputPath) {
  return outputPath.endsWith('.html')
    ? htmlMinifier.minify(content, htmlMinifierOptions)
    : content
}

/**
 * Extracts the excerpt from a document.
 *
 * @param {any} doc A real big object full of all sorts of information about a document.
 * @returns {string} the excerpt.
 */
function extractExcerpt(doc) {
  if (!doc.hasOwnProperty('templateContent')) {
    console.warn('❌ Failed to extract excerpt: Document has no property `templateContent`.')
    return ''
  }

  const excerptSeparator = '<!--more-->'
  const content = doc.templateContent

  if (content.includes(excerptSeparator)) {
    return content.substring(0, content.indexOf(excerptSeparator)).trim()
  }

  const pCloseTag = '</p>'
  return content.includes(pCloseTag)
    ? content.substring(0, content.indexOf(pCloseTag) + pCloseTag.length)
    : content
}

/**
 * @param {string} content
 * @returns {Promise<string>}
 */
async function minifyJs(content) {
  try {
    const result = await minify(content, { mangle: { toplevel: true } })
    return result.code ?? ''
  } catch (error) {
    console.error('❌', error)
    return ''
  }
}
