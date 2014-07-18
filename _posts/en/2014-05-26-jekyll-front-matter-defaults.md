---
date: 2014-05-26 08:17:33
title: "Jekyll: Front Matter defaults"
---
With Jekyll 2 there is now the possibility to set defaults for YAML Front Matter inyour configuration file: [Front Matter Defaults](http://jekyllrb.com/docs/configuration/#frontmatter-defaults).

Instead of repeating yourself by adding `layout: post` to the Front Matter over and over again, you set a default in your _config.yml. You can limit the scope of these rules with `path` and `type`. An empty value in path means targeting all files. Optionally you specify the type of file (`page`, `post` or `draft`).


```
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
  -
    scope:
      path: ""
      type: "post"
    values:
      layout: "post"
      category: "blog"
```

At first I set the default layout for all files. All posts should have the posts’ layout. The second part is more specific and overwrites the default layout from the first part.

Keep in mind that settings in layouts or other Jekyll files may overwrite your Front Matter defaults.

However. Great feature. It’s more and more fun to work with Jekyll.

__Update:__ [Jekyll 2.1.0](http://jekyllrb.com/news/2014/06/28/jekyll-turns-21-i-mean-2-1-0/) comes with some good news. Collections are now allowed in `scope`and one can set default categories as well.
