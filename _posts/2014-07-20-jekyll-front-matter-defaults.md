---
date: 2014-07-20 17:03:34
title: "Jekyll: Front Matter Defaults"
---
Mit [Jekyll 2.0.0](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/) kann man Standardwerte für’s Front Matter bestimmen. Auch Collections und Categories sind seit [2.1.0](http://jekyllrb.com/news/2014/06/28/jekyll-turns-21-i-mean-2-1-0/) verwendbar.

<p class="block-note">Da GitHub Pages noch nicht 2.1 (<a href="https://github.com/github/pages-gem/pull/75">Status</a>) hat, muss lokal kompiliert werden, um Front Matter Defaults jetzt schon nutzen zu können.</p>

### Meine Defaults

Wir arbeiten uns vom Groben zum Feinen durch. Als erstes habe ich das Standardlayout und die Sprache für alles festgelegt. Die Angabe von `path` sagt quasi _„Take all the things!“_.

```
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
      lang: "de"
```

Beiträge bekommen ein eigenes Layout. Wir überschreiben das Layout und setzen auch gleich die Standardkategorie für Blogeinträge.

```
  -
    scope:
      path: ""
      type: "post"
    values:
      layout: "post"
      category: "blog"
```

Da ich mir ja diese bilinguale Sache an’s Bein gebunden habe, muss ich irgendwie zwischen deutschen und englischen Beiträgen unterscheiden. Das geschieht mit `lang: [de|en]`.

Meine Standardsprache ist Deutsch, ich überschreibe also nur den Wert, wenn sich die Seite oder der Beitrag im Verzeichnis `/en` befindet.

```
  -
    scope:
      path: "en"
    values:
      lang: "en"
```

Da für Jekyll alles innerhalb eines `/_posts`-Verzeichnisses ein Beitrag ist, muss ich hier noch einmal explizit die Sprache festlegen.

```
  -
    scope:
      path: "en/_posts"
      type: "post"
    values:
      lang: "en"
```

Auf lange Sicht machen die Front Matter Defaults die Arbeit mit Jekyll einfacher. Auch, wenn man nur das Layout für Seiten und Beiträge festlegt. Gute Sache.
