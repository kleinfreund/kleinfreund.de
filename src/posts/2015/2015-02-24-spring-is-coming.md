---
title: Spring is coming
date: 2015-02-24
tags:
- dev
---
It’s time again. Not only is spring at the door but also a new year for the blog. The first entry was posted on 1st February 2014. Today is not the 1st February? You are completely right about that. Don’t worry about that. In the last couple of days I’ve been tightening and loosening some screws.

## Subdomain for Better Performance

The most important change is the move to a subdomain. Look at it, it reads __hey.kleinfreund.de__ up there now. This has pragmatic reasons. If one points the root domain to the GitHub Pages IP via A Record it gets redirected. This is part of a DDoS mitigation strategy the girls and boys run over there (Anselm Hannemann <a href="https://helloanselm.com/2014/github-pages-redirect-performance/">wrote this down</a> last year).

The redirect took 3–5 seconds for me and that’s way too long. Heavy-heartedly I was about to setup the typical www. subdomain until it crossed my mind that one can choose freely. Anatol Broder chose <a href="http://anatol.penibelst.de/">anatol.penibelst.de</a> for example.

## Critical CSS

Currently, I’m experimenting with inlining my full stylesheet. It’s 7.3 KB big. With that I cut out the extra HTTP request and don’t block rendering with an external stylesheet. In return, the ressource is not cachable anymore, because the stylesheet is now part of the HTML document.

With this change, my build time went up by 6–7 seconds. That’s due to the `sassify` and `scssify` filters not utilizing the Sass cache. Locally, I can work around this with <a href="https://talk.jekyllrb.com/t/is-capture-slow-or-are-my-build-times-normal/32/4">a tip</a> from envygeeks posted over at the new Jekyll forums.

```
{%- raw -%}
{% if jekyll.environment == 'local' %}
  <link rel="stylesheet" href="/css/kleinfreund.css">
{% else %}
  <style>
    {% capture scss_include %}
      {% include kleinfreund.scss %}
    {% endcapture %}

    {{ scss_include | scssify }}
  </style>
{% endif %}
{%- endraw -%}
```

## Under the Hood

Until now there were a couple of pages which basically were the same with the only difference being language-specific strings. That was me being lazy, not creating a layout and the needed strings in the locales.yml for that purpose. I cought up on this.

In addition, I wrote an article about moving the website of my parents from Wordpress to Jekyll. However, it eventually got lost after the partition with Windows on it died. Right now I work on the remaining 50 GB which has Ubuntu on it.
