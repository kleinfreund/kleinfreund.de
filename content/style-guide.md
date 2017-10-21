---
title: Style Guide
description: Showing off the appearance of paragraphs, links, figures, code blocks etc. in a small style guide.
date: 2017-10-14T12:23:00Z
menu: main
---
I’ve redesigned my site for the umpteenth time now. One big phase has always been the work on the basic visual appearance.
Up until now, I scavanged my archive for posts that have the elements that needed to be styled: code blocks, quotes, etc. This was a tedious process. Now, I use this document containing all basic forms of content my site uses. My personal style guide.

What I mean with “basic forms of content” can be summarized by listing the set of elements on a page that can be styled with plain CSS element selectors (i.e. without any classes). If you’re familar with Harry Roberts’ [Inverted Triangle CSS methodology](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528), the style guide deals only with the elements layer.



### Contents

- [Inline Styles](#inline-styles)
  - [Links](#links)
- [Lists](#lists)
- [Quotes](#quotes)
- [Code & User Input](#code-user-input)
- [Headings](#headings)
- [Images](#images)



### Inline Styles

The most common forms of emphasis are *italic* and **bold**. Mostly seen in handwritten notes, another form is a mark. It tends to <mark>stick out of its context</mark> in a rather attention-grabbing fashion.

Rarely, you see abbreviations like <abbr title="Mozilla Developer Network">MDN</abbr> marked up with the `<abbr>` element. Edits made to a text can be <del>repersented</del> <ins>represented</ins> by marking up the parts that were deleted (with `<del>`) and inserted (with `<ins>`).

Sometimes I need to represent keyboard shortcuts. For most cases, simple `<kbd>` elements suffice and require no extra markup. When using symbols (e.g. →) instead of words (e.g. rightwards arrow), providing the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) attribute with the word description of the symbol as its value enables screen readers to read out the shortcuts correctly.

One of my favorite shortcuts in [Sublime Text](https://sublimetext.com) is <kbd>Ctrl</kbd>+<kbd>D</kbd>. It adds the next occurence of the current selection to the selection. For [Visual Studio Code](https://code.visualstudio.com) it would be <kbd>F2</kbd> to rename a symbol, simply because it brings functionality often only found in full-blown <abbr title="Integrated Development Environment">IDE</abbr>s to the world of text editors.



#### Links

Arguably the most important HTML element at our disposal, the [`<a>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

For links within paragraphs, I experimented a bit with the visual signifier which tells users that there is a link. This was inspired in parts by [how Sara Soueidan styles links on her page](http://www.sarasoueidan.com). She adds a bit of padding to the horizontal axis so that the underline appears wider than the actual link text.

This creates visually bigger spaces between regular text and links. It’s a bit unpleasent. I’ve added negative margins on the same axis with the exact same value—but negative—pulling the surrounding content back.

```css
/*
1: Draw the bottom border a bit wider by adding a small padding.
2: Remove the superfluous visual space to maintain an even word spacing.
*/
p a {
  padding-right: 0.15em; /* 1 */
  padding-left: 0.15em; /* 1 */
  margin-right: -0.15em; /* 2 */
  margin-left: -0.15em; /* 2 */
}
```

However, it also introduces a new issue: Over-drawing the visual space of a links’ surrounding content might lead to partial occlusion of said content. This is to be expected when using negative margins. Due to the order of the content, content appearing *before* the link might be occluded but content appearing *after* the link might occlude the links’ hover style. You can see this in effect here:

<span style="font-size: 2em;">[<a href="#">¯\\_(ツ)_/¯</a>]</span>

Note, that the opening square bracket is partially occluded by the hover style, which in turn is partially occluded by the closing square bracket.

There is a dirty workaround using some `z-index` shenanigans, but I don’t recommend it.

```css
/*
Make sure paragraph content is not occluded by hover styles.
*/
p {
  position: relative;
  z-index: 1;
}

p a:hover {
  position: relative;
  z-index: -1;
}
```

It’s a bad solution as it breaks tapping and holding a link on mobile platforms. The default action is showing a context menu after a certain time. With the workaround, this is no longer the case. Now, after a while it’ll select the character that was tapped.



### Lists

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
  - [MDN: Array (global object)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [MDN: Event API](https://developer.mozilla.org/en-US/docs/Web/API/Event)
  - [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Sara Soueidan: Migrating from Jekyll+Github Pages to Hugo+Netlify](http://www.sarasoueidan.com/blog/jekyll-ghpages-to-hugo-netlify/)
- [Manuel Matuzovic: Writing CSS with Accessibility in Mind](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)
- [Una Kravets: Locally Scoped CSS Variables: What, How, and Why](https://una.im/local-css-vars/)

1. First list item
2. Second list item

    with content spanning

    multiple paragraphs.

3. Third list item
  1. More creativity
  2. Even more creativity



### Quotes

<blockquote>
  <p>Whenever accessibility is really hard, it’s usually just an over-complex component and should be dumped anyway.</p>
  <cite><a href="https://twitter.com/heydonworks/status/914879392391852033">Heydon Pickering</a></cite>
</blockquote>

As my grandma used to say <q>Remember, there is a <q>proper HTML</q> element for when one wants to quote inline</q>.



### Code & User Input

By default, code blocks work well but are rather limited compared to what we see in our text editors. It would be nice to have automatic line numbers. Maybe this can be done with [CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters) and by wrapping each line of code in its own `code` element.

In the [documentation for Hugo](https://gohugo.io/templates/lists/#example-list-templates) I saw another neat improvement. On hovering over a code block, the block is enlarged. I looked at their implementation and adopted it, although slightly different.

First of all, the CSS must only be applied when a certain viewport width is exceeded since on smaller screens, the code blocks use the available space anyway. For larger viewport widths, code blocks are enlarged on hover, but only if they have an `expandable` class.

```css
@media only screen and (min-width: 1000px) {
  pre.expandable {
    width: 100%;
    transition: width 0.05s ease-in;
  }

  pre.expandable:hover {
    width: 94vw;
    transition-timing-function: ease-out;
  }
}
```

Note that I only add the `expandable` class for blocks that have overflowing content. Other blocks don’t need this behavior. This is a trade-off though, as adding said class requires JavaScript.



### Headings

<h1 style="margin-top: 0;">Heading Level 1</h1>

<h2 style="margin-top: 0;">Heading Level 2</h2>

<h3 style="margin-top: 0;">Heading Level 3</h3>

<h4 style="margin-top: 0;">Heading Level 4</h4>

<h5 style="margin-top: 0;">Heading Level 5</h5>

<h6 style="margin-top: 0;">Heading Level 6</h6>



### Images

<figure>
  <img src="https://c1.staticflickr.com/9/8675/30106830192_086f433ab8_k.jpg" alt="Rain drops on a spiders’ web">
  <figcaption>
    <a href="https://www.flickr.com/photos/kleinfreund/29739015432">via Flickr</a>, shot with a Helios 44-2 1:2.0/58mm manual lens.
  </figcaption>
</figure>

A figures’ caption should have a slightly smaller text size than regular text.
