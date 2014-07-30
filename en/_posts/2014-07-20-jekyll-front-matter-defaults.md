---
date: 2014-07-20 17:03:33
title: "Jekyll: Front Matter Defaults"
---
With [Jekyll 2.0.0](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/) one can set default values for the Front Matter. This is true for collections and categories since [2.1.0](http://jekyllrb.com/news/2014/06/28/jekyll-turns-21-i-mean-2-1-0/) as well.

<p class="block-note">Because GitHub Pages isn’t running on 2.1 (<a href="https://github.com/github/pages-gem/pull/75">status</a>) yet, one has to compile locally to be able to set Front Matter defaults.</p>

### My Defaults

We go from the rough things to the fine details. At first I set the default layout and language for everything. Basically, `path: ""` says _“Take all the things!”_.

```
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
      lang: "de"
```

Posts get their own layout. We overwrite the layout and set a default category for blog posts as well.

```
  -
    scope:
      path: ""
      type: "post"
    values:
      layout: "post"
      category: "blog"
```

Since I’m doing this bilingual thing, I somehow have to differ between German and English entries. This is done with `lang: [de|en]`.

My default language is German, so I overwrite the value only when the page or post happens to reside inside the `/en` directory.

```
  -
    scope:
      path: "en"
    values:
      lang: "en"
```

Because Jekyll is treating everything inside a `/_posts` directory as a post, I need to set the language explicitly again.

```
  -
    scope:
      path: "en/_posts"
      type: "post"
    values:
      lang: "en"
```

In the long term Front Matter defaults make the work with Jekyll easier. Even when you only set the default layout for pages and posts. Good thing.
