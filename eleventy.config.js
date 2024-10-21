import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { inspect } from 'node:util'

import { IdAttributePlugin } from '@11ty/eleventy'
import pluginRss from '@11ty/eleventy-plugin-rss'
import * as cheerio from 'cheerio'
import CleanCSS from 'clean-css'
import htmlMinifier from 'html-minifier'
import yaml from 'js-yaml'
import { minify } from 'terser'

/** @import { Options as HtmlMinifierOptions } from 'html-minifier' */

const ELEVENTY_INPUT_DIR = 'src'

/**
 * https://github.com/kangax/html-minifier#options-quick-reference
 *
 * @type {HtmlMinifierOptions}
 */
const htmlMinifierOptions = {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
}

export default function (eleventyConfig) {
  // Allows data file to be stored in YAML
  eleventyConfig.addDataExtension('yml,yaml', (contents) => yaml.load(contents))

  // Copies static files to the output directory
  eleventyConfig
    .addPassthroughCopy('src/img')
    .addPassthroughCopy('src/css')
    .addPassthroughCopy('src/js')
    .addPassthroughCopy('src/favicon.ico')
    .addPassthroughCopy('src/.htaccess')
    .addPassthroughCopy('src/manifest.webmanifest')

  // Defines shortcode for generating post excerpts
  eleventyConfig.addShortcode('excerpt', (post) => extractExcerpt(post))

  // Filters for compressing CSS
  eleventyConfig.addFilter('inline_css_imports', inlineCssImports)
  eleventyConfig.addFilter('minify_css', minifyCss)
  eleventyConfig.addFilter('minify_js', minifyJs)

  // Compresses output HTML
  if (process.env.NODE_ENV === 'production') {
    eleventyConfig.addTransform('minify_html', minifyHtml)
  }

  // Injects heading anchors
  eleventyConfig.addTransform('inject_heading_anchors', createInjectHeadingAnchors({
    selector: '[id]:is(h2,h3,h4,h5,h6):not(:has(> .header-anchor))',
  }))

  // Logs and prints data
  if (process.env.NODE_ENV !== 'production') {
    eleventyConfig.addAsyncFilter('log', async function (value) {
      try {
        console.log(JSON.stringify(value, null, 2))
      } catch { }

      return inspect(value)
    })
  }

  // ID attribute plugin
  eleventyConfig.addPlugin(IdAttributePlugin)

  // RSS plugin
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addFilter('absoluteUrl', pluginRss.absoluteUrl)
  eleventyConfig.addFilter('convertHtmlToAbsoluteUrls', pluginRss.convertHtmlToAbsoluteUrls)
  eleventyConfig.addFilter('dateToRfc3339', pluginRss.dateToRfc3339)
  eleventyConfig.addFilter('getNewestCollectionItemDate', pluginRss.getNewestCollectionItemDate)

  return {
    dir: {
      input: ELEVENTY_INPUT_DIR,
    },
  }
}

/**
 * @param {string} cssPath
 * @returns {string} the concatenated contents of the CSS files found by inlining `@import` rules in the CSS file at `cssPath`.
 */
function inlineCssImports(cssPath) {
  return readFileContent(cssPath)
    .replace(/@import\s+(["'])(.*)\1\s*(?:layer\((.*)\))?;/g, (_match, _p1, path, layer) => {
      if (layer) {
        return `@layer ${layer} {
          ${readFileContent(path)}
        }`
      } else {
        return readFileContent(path)
      }
    })
}

/**
 * @param {string} path
 * @returns {string}
 */
function readFileContent(path) {
  return readFileSync(join(ELEVENTY_INPUT_DIR, path), 'utf8')
}

/**
 * @param {string} content
 * @returns {string} the minified CSS content
 */
function minifyCss(content) {
  const { styles, errors } = new CleanCSS().minify(content)

  if (errors.length > 0) {
    console.error('❌ Could not minify CSS.')

    for (const error of errors) {
      console.error('❌', error)
    }

    return content
  }

  return styles
}

/**
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
 * @param {string} content
 * @returns {Promise<string>}
 */
async function minifyJs(content) {
  try {
    const { code } = await minify(content, { mangle: { toplevel: true } })
    return code ?? ''
  } catch (error) {
    console.error('❌', error)
    return ''
  }
}

/**
 * @typedef {object} InjectHeadingAnchorsOptions
 * @property {string} [selector]
 */

/** @type {Required<InjectHeadingAnchorsOptions>} */
const injectHeadingAnchorsDefaultOptions = {
  selector: '[id]:is(h2,h3,h4,h5,h6)',
}

/**
 * @param {InjectHeadingAnchorsOptions} [options]
 * @returns {(content: string) => string}
 */
function createInjectHeadingAnchors(options) {
  return function (content) {
    return injectHeadingAnchors(content, options)
  }
}

/**
 * @param {string} content
 * @param {InjectHeadingAnchorsOptions} [options]
 * @returns {string}
 */
function injectHeadingAnchors(content, options) {
  /** @type {Required<InjectHeadingAnchorsOptions>} */
  const { selector } = {
    ...injectHeadingAnchorsDefaultOptions,
    ...options,
  }

  const $ = cheerio.load(content)
  $(selector).map((_i, el) => {
    const $heading = $(el)
    $heading.attr('tabindex', '-1')

    $heading.prepend(`<a class="header-anchor" href="#${$heading.attr('id')}">
      <span class="header-anchor__icon">
        <b>#</b>
        <span class="visually-hidden">Jump to heading</span>
      </span>
    </a>`)

    return $heading
  })

  return $.html()
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
