---
date: 2014-07-20 17:03:34
title: "Jekyll: Front Matter Defaults"
tags:
- dev
- jekyll
---
Mit [Jekyll 2](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/) kann man Standardwerte für’s Front Matter bestimmen. Hurra! Keine Layout- und Spracheinstellungen in Beiträgen mehr. Version [2.3.0](http://jekyllrb.com/news/2014/08/11/jekyll-2-3-0-released/) hat das noch einmal verbessert.

## Meine Defaults

Wir arbeiten uns vom Groben zum Feinen durch. Als erstes habe ich das Standardlayout und die Sprache für alles festgelegt. Mit 2.3.0 ist `scope` nicht mehr zwingend nötig. Lässt man es weg, verhält sich die Regel quasi wie _„Take all the <del>things</del> documents!“_.

Die zweite und dritte Regeln sorgen dafür, dass Beiträge und Seiten ihr entsprechendes Layout bekommen. Zum Schluss bekommt englischer Inhalt noch `lang: en`. So kann ich zwischen den Sprachen meines Inhalts unterscheiden ohne Kategorien zu missbrauchen.

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

Auf lange Sicht machen die Front Matter Defaults die Arbeit mit Jekyll einfacher. Auch, wenn man nur das Layout für Seiten und Beiträge festlegt. Gute Sache.
