---
date: 2014-08-09 06:50:37
title: "Jekyll: Mehrsprachig"
tags:
- dev
- jekyll
---
Einer der großen Reize bei Jekyll ist der Luxus mit GitHub Pages arbeiten zu können. Wenn man aber eine mehrsprachige Seite bauen will, dann wird’s schwerer. Plugins kann man dann bis auf [ein paar Ausnahmen](https://help.github.com/articles/using-jekyll-plugins-with-github-pages) nicht benutzen.

Meine Seite ist zweisprachig—Deutsch und Englisch—wobei Deutsch die Hauptsprache ist. Dafür brauche ich eine angepasste Verzeichnisstruktur, Kategorien und Front Matter Defaults.

## Verzeichnisstruktur

```
.
├── _posts
|   └── 2014-08-09-jekyll-mehrsprachig.md
├── en
|   ├── _posts
|   |   └── 2014-08-09-jekyll-multilingual.md
|   ├── profile.md
|   └── index.html
├── profil.md
└── index.html
```

Für die Hauptsprache verwende ich Jekyll wie üblich. Das normale `_posts`-Verzeichnis für Beiträge und Seiten im Projektverzeichnis. Weitere Übersetzungen landen entsprechend in `/en` für Englisch.

## Permalinks

Da sich Titel auch über Sprachen hinweg doppeln können, brauche ich Permalinks, die sich unterscheiden. Für „Jekyll: Mehrsprachig“ und „Jekyll: Multilingual“ würde es auch ohne gehen, aber bei „Soundtracks“ gäbe es einen Konflikt.

Wirft man einen Blick [in die Dokumentation](http://jekyllrb.com/docs/permalinks/#template-variables) zum Thema Permalinks, dann stellt man fest, dass es nur wenige Möglichkeiten gibt. Man könnte das Sprachkürzel in den Titel einbauen, aber das ist doof und umständlich.

Wir nehmen Kategorien. Das ist auch nicht ganz sauber, aber es funktioniert. In Wahrheit haben wir die Kategorie `en` mit unserer Verzeichnisstruktur schon angelegt.

### _config.yml:

```yaml
permalink: /:categories/:year/:month/:title
```

<div class="block-note">Mit Ausnahme von <code>permalink: pretty</code> gelten diese Einstellungen nur für Beiträge. Für Seiten müssen die Permalinks explizit festgelegt werden.</div>

## Sprache festlegen

Um zwischen deutschen und englischen Dokumenten unterscheiden zu können, müssen wir nicht die Kategorien zweckentfremden. Das brauchen wir nur, weil sich für die Permalinks nichts anderes anbietet. Bei Beiträgen und Seiten leg ich die Sprache mit `lang: [de|en]` fest.

Mit Front Matter Defaults brauchen wir das auch nicht für jedes Dokument einzeln festlegen. Schön!

### _config.yml:

```yaml
defaults:
  # Default language
  -
    values:
      lang: "de"
  # Language for everything inside `/en`
  -
    scope:
      path: "en"
    values:
      lang: "en"
  # Language for English posts
  -
    scope:
      path: "en/_posts"
      type: "posts"
    values:
      lang: "en"
```

## Die Sache mit dem Blog

Einen Blog mit mehreren Seiten anzulegen, ist mit Jekyll kein Problem. Das hat aber auch seine Einschränkungen. Man kann nämlich die Beiträg, die `paginator.posts` zurückliefert, nicht vorher filtern. Das heißt, ich kann nicht einfach alle Beiträge mit `lang: en` nehmen und daraus einen Blog mit Paginierung machen.

Da ich kompromissfreudig bin, hab ich dieses Vorhaben gestrichen. Stattdessen nehm ich mir jetzt die ersten 10 Beiträge und verlinke dann auf’s Archiv.

### _config.yml:

```yaml
max_posts: 10
```

### index.html:

{% raw %}
```liquid
{% assign posts_de = site.posts | where:"lang","de" %}

{% for post in posts_de limit:site.max_posts %}
<!-- Beiträge 1–10 -->
{% endfor %}

{% if posts_de.size > site.max_posts %}
<!-- Archivlink, bei mehr als 10 Beiträgen -->
{% endif %}
```
{% endraw %}

Das war’s im Grunde. Zum besseren Verständnis könnt ihr euch das [GitHub Repository]({{ site.author.github | append:"/kleinfreund.github.io" }}) meiner Seite ansehen und durch die Dateien klicken.
