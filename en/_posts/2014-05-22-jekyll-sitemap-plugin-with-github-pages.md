---
date: 2014-05-22 11:02:13
title: "Jekyll: Sitemap plugin with GitHub Pages"
tags:
- dev
- jekyll
---
A Jekyll site with plugins only runs on GitHub Pages, if you compile locally. [As of recently](https://help.github.com/articles/using-jekyll-plugins-with-github-pages), atleast for creating a sitemap, this isn’t necessary anymore.

One installs the plugin [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)…

```
gem install jekyll-sitemap
```

…and activates it by adding an entry to the _config.yml:

```
gems:
  - jekyll-sitemap
```

The plugin is whitelisted. This means you can use it while letting GitHub Pages do the Jekyll build process for you. Super!

As of version 0.5.0 (not on GitHub Pages yet) it's possible to exclude pages with `sitemap: false` in the front matter.
