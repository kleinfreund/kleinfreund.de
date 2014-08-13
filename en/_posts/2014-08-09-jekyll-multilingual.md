---
date: 2014-08-09 06:50:37
title: "Jekyll: Multilingual"
tags:
- dev
- jekyll
---
One of the big ups of Jekyll is the luxutry of being able to work with GitHub Pages. Building a multilingual site is a bit harder, though. Using plugins is except for [a view exceptions](https://help.github.com/articles/using-jekyll-plugins-with-github-pages) not possible.

My site is bilingual—German and English—whereas German is my main language. To do this I need an adjusted directory structure, categories and front matter defaults.

## Direcotry Structure

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

For the main language, I use Jekyll as usual. The regular `_posts`-directory for posts and pages in the project directory. Translations are housed in the corresponding subdirectory (e.g. `/en` for English).

## Permalinks

Because titles can duplicate across languages, we need permalinks which distinct from one another. It’ll work without for titles like “Jekyll: Mehrsprachig” and “Jekyll: Multilingual”, but we get a conflict for “Soundtracks”.

If we take a look [at the docs](http://jekyllrb.com/docs/permalinks/#template-variables) for permalinks, we don’t see too many possibilities. One could use the language slug in the title, but that’s silly and inconvenient.

We use categories. That’s not too sound as well, but it works. Actually, we already created the category `en` with out directory structure.

### _config.yml:

```yaml
permalink: /:categories/:year/:month/:title
```

<div class="block-note">With the exception of <code>permalink: pretty</code> these settings apply to posts only. Permalinks need to be explicitly set for pages.</div>

## Set the Language

To distinct between German and English documents, we don’t need to alienate categories again. We only needed that for permalinks. For posts and pages, we set the language with `lang: [de|en]`.

And we don’t need to set this for every document over and over because we can use front matter defaults. Nice!

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

## The Blog Thing

Creating a paginated blog with Jekyll is super easy. However this is not with its limitations. For example one isn’t able to filter the posts that `paginator.posts` is returning. That means we can’t take all posts with `lang: en` and create a paginated blog page with them.

Because I’m open for compromises, I just xed that out. Instead I show the first 10 entries and link to the archive.

### _config.yml:

```yaml
max_posts: 10
```

### index.html:

{% raw %}
```liquid
{% assign posts_de = site.posts | where:"lang","de" %}

{% for post in posts_de limit:site.max_posts %}
<!-- posts 1–10 -->
{% endfor %}

{% if posts_de.size > site.max_posts %}
<!-- link to the archive only for more that 10 posts -->
{% endif %}
```
{% endraw %}

That’s it. For better understanding you can checkout the [GitHub repository]({{ site.author.github | append:"/kleinfreund.github.io" }}) of my site and go through the files.
