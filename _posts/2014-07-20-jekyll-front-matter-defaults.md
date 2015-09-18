---
date: 2014-07-20 17:03:33
title: "Jekyll: Front Matter Defaults"
tags:
- dev
- jekyll
---
With [Jekyll 2](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/) one can set default values for the front matter. Hooray! No more layout and language settings on posts for me. Version [2.3.0](http://jekyllrb.com/news/2014/08/11/jekyll-2-3-0-released/) refined this once again.

## My Defaults

We go from the rough things to the fine details. At first I set the default layout and language for everything. As of 2.3.0, the `scope` field is no longer required. Leaving it out acts like _“Take all the <del>things</del> documents!”_.

The second and third rules set default layouts for pages and posts. The last sets define `lang: en` for English content. This way I can differ between the language of my content without misusing categories.

```yaml
defaults:
  # [1.]
  -
    values:
      layout: "default"
      lang: "de"

  # [2.]
  -
    scope:
      type: "pages"
    values:
      layout: "page"

  # [3.]
  -
    scope:
      type: "posts"
    values:
      layout: "post"

  # [4.]
  -
    scope:
      path: "en"
    values:
      lang: "en"

  # [5.]
  -
    scope:
      path: "en/_posts"
      type: "posts"
    values:
      lang: "en"
```

In the long term front matter defaults make the work with Jekyll easier. Even when you only set the default layout for pages and posts. Good thing.
