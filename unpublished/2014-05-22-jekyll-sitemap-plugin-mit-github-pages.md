---
date: 2014-05-22 11:02:14
title: "Jekyll: Sitemap-Plugin mit GitHub Pages"
tags:
- dev
- jekyll
---
Eine Jekyll-Seite läuft mit Plugins auf GitHub Pages nur, wenn man vorher lokal kompiliert. [Seit kurzem](https://help.github.com/articles/using-jekyll-plugins-with-github-pages) muss man diesen Umweg zumindest für das erzeugen einer Sitemap nicht mehr gehen.

Man installiert das Plugin [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)…

```
gem install jekyll-sitemap
```

…und aktiviert es über einen Eintrag in der _config.yml:

```
gems:
  - jekyll-sitemap
```

Das Plugin steht auf der Whitelist und läuft somit auch mit bequemen Build-Prozess auf GitHub Pages. Spitze!

Seit Version 0.5.0 (noch nicht auf GitHub Pages) kann man mit `sitemap: false` im Front Matter auch Seiten wie die 404.html ausschließen.
