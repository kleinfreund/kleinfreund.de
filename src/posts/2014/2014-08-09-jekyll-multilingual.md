---
title: 'Jekyll: Multilingual'
date: 2014-08-09
tags:
- dev
---

One of the big ups of Jekyll is the luxutry of being able to work with GitHub Pages. Building a multilingual site is a bit harder, though. Using plugins is except for [a view exceptions](https://help.github.com/articles/using-jekyll-plugins-with-github-pages) not possible.

My site is bilingual—German and English—whereas German is my main language. To do this I need an adjusted directory structure, categories and front matter defaults.

### Directory Structure

```
.
├── _posts
│   └── 2014-08-09-jekyll-mehrsprachig.md
├── en
│   ├── _posts
│   │   └── 2014-08-09-jekyll-multilingual.md
│   ├── profile.md
│   └── index.html
├── profil.md
└── index.html
```

For the main language, I use Jekyll as usual. The regular `_posts`-directory for posts and pages in the project directory. Translations are housed in the corresponding subdirectory (e.g. `/en` for English).

### Permalinks

Because titles can duplicate across languages, we need permalinks which distinct from one another. It’ll work without for titles like “Jekyll: Mehrsprachig” and “Jekyll: Multilingual”, but we get a conflict for “Soundtracks”.

If we take a look [at the docs](https://jekyllrb.com/docs/permalinks/#template-variables) for permalinks, we don’t see too many possibilities. One could use the language slug in the title, but that’s silly and inconvenient.

We use categories. That’s not too sound as well, but it works. Actually, we already created the category `en` with out directory structure.

#### _config.yml:

```yaml
permalink: /:categories/:year/:month/:title
```

<p class="block-note">With the exception of <code>permalink: pretty</code> these settings apply to posts only. Permalinks need to be explicitly set for pages.</p>

### Set the Language

To distinct between German and English documents, we don’t need to alienate categories again. We only needed that for the permalinks. For posts and pages we set the language with `lang: [de|en]`.

And with front matter defaults we don’t even need to do this for each document over and over. Nice!

#### _config.yml:

```yaml
defaults:
  # Default language
  -
    scope:
      path: ""
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
      type: "posts" # As of version 2.3.0, Jekyll uses plural keywords for type
    values:
      lang: "en"
```

### The Blog Thing

Creating a paginated blog with Jekyll is super easy. However this has its limitations. For example one isn’t able to filter the posts `paginator.posts` is returning. That means I can’t just take all posts with `lang: en` and make a blog with pagination.

Because I

Da ich kompromissfreudig bin, hab ich dieses Vorhaben gestrichen. Stattdessen nehm ich mir jetzt die ersten 10 Beiträge und verlinke dann auf’s Archiv.

#### _config.yml:

```yaml
max_posts: 10
```

#### index.html:

```liquid
{% assign posts_de = site.posts | where: "lang", "de" %}

{% for post in posts_de limit:site.max_posts %}
<!-- Beiträge 1–10 -->
{% endfor %}

{% if posts_de.size > site.max_posts %}
<!-- Archivlink, bei mehr als 10 Beiträgen -->
{% endif %}
```

Das war’s im Grunde. Zum besseren Verständnis könnt ihr euch das [GitHub Repository](http://github.com/kleinfreund/kleinfreund.de) meiner Seite ansehen und durch die Dateien klicken.
