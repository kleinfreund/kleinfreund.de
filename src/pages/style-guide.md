---
title: Style guide
description: Showing off the appearance of paragraphs, links, figures, code blocks, etc. in a small style guide.
date: 2017-10-14
---

I’ve redesigned my site for the umpteenth time now. One big phase has always been the work on the basic visual appearance.
Up until now, I scavanged my archive for posts that have the elements that needed to be styled: code blocks, quotes, etc. This was a tedious process. Now, I use this document containing all basic forms of content my site uses. My personal style guide.

---

What I mean with “basic forms of content” can be summarized by listing the set of elements on a page that can be styled with plain CSS element selectors (i.e. without any classes). If you’re familar with Harry Roberts’ Inverted Triangle CSS methodology, the style guide deals only with the elements layer.

## Contents

- [Inline Styles](#inline-styles)
- [Lists](#lists)
- [Quotes](#quotes)
- [Code](#code)
- [Headings](#headings)
- [Images](#images)

## Inline Styles

The most common forms of emphasis are _italics_ and **bold text**. Mostly seen in handwritten notes, another form is a mark.

Rarely, you see abbreviations like <abbr title="Mozilla Developer Network">MDN</abbr> (Mozilla Developer Network) marked up with the `abbr` element. However, note that the `title` attribute is often not conveyed to assistive technology; therefore, it’s best to add the expansion as regular text on first usage of the abbreviation.

Edits made to a text can be <del>repersented</del> <ins>represented</ins> by marking up the parts that were deleted with `<del>` and inserted with `<ins>`.

One can mark up keyboard shortcuts such as <kbd>Ctrl</kbd>+<kbd>D</kbd> with `<kbd>` tags. Inline code is usually added in `<code>` tags.

## Lists

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/)
  - [MDN: Array (global object)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [MDN: Event API](https://developer.mozilla.org/en-US/docs/Web/API/Event)
  - [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Una Kravets: Locally Scoped CSS Variables: What, How, and Why](https://una.im/local-css-vars/)

1. First list item
2. Second list item

   with content spanning

   multiple paragraphs.

3. Third list item

   1. More creativity

   2. Even more creativity

## Quotes

<blockquote>
  <p>Whenever accessibility is really hard, it’s usually just an over-complex component and should be dumped anyway.</p>
  <cite><a href="https://twitter.com/heydonworks/status/914879392391852033">Heydon Pickering</a></cite>
</blockquote>

As my grandma used to say <q>Remember, there is a <q>proper HTML</q> element for when one wants to quote inline</q>.

## Code

By default, code blocks work well but are rather limited compared to what we see in our text editors. It would be nice to have automatic line numbers. Maybe this can be done with [CSS counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters) and by wrapping each line of code in its own `code` element.

```css
/* Add a gap above non-first list items if its list has any list items containing a list themselves (or a `pre` element). A flat list remains compact, but nested lists have more spacing for all but the deepest nesting level */
:where(ul, ol, dl):where(:not([class])):where(:has(li li), :has(pre)) > li + li {
  margin-block-start: calc(var(--f-vertical-spacing));
}
```

- Code in lists

  ```css
  /* Add a gap above non-first list items if its list has any list items containing a list themselves (or a `pre` element). A flat list remains compact, but nested lists have more spacing for all but the deepest nesting level */
  :where(ul, ol, dl):where(:not([class])):where(:has(li li), :has(pre)) > li + li {
    margin-block-start: calc(var(--f-vertical-spacing));
  }
  ```

- with more content

## Headings

# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

## Images

<figure>
  <img src="/img/posts/raindrops-on-spiders-web.jpg" alt="Rain drops on a spiders’ web">
  <figcaption>
    <a href="https://www.flickr.com/photos/kleinfreund/30106830192">via Flickr</a>, shot with a Helios 44-2 1:2.0/58mm manual lens.
  </figcaption>
</figure>

A figure’s caption should have a slightly smaller text size than regular text.
