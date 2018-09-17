# kleinfreund.de

- [Harry Roberts: Manage large CSS projects with ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)

## Eleventy To Do

- Find out how to inline and minify CSS with CleanCSS.

  CleanCSS Issue: https://github.com/jakubpawlowicz/clean-css/issues/1048

  Draft for base.liquid:

  ```liquid
  {% if eleventy.environment == production %}
  {% else %}
    <style>
      {% capture main_css %}
        {% include css/kleinfreund.css %}
      {% endcapture %}

      {{ main_css | minify_css }}
    </style>
    {% comment %} <link rel="stylesheet" href="{{ '/css/kleinfreund.css' | url }}">

    {% for cssPath in css %}
      <link rel="stylesheet" href="{{ '/css/isolated/' | url }}{{ cssPath }}">
    {% endfor %} {% endcomment %}
  {% endif %}
  ```

- Waiting on [#147](https://github.com/11ty/eleventy/issues/147) so posts with a an `tags` property can be assigned an *additional* collection via a directory-specific data file (i.e. `./posts/posts.json`)

## Generate icons

```
convert -background none -density 152x152 icon.svg icon.png
convert -background none -density 16x16 icon.svg favicon-16.png
convert -background none -density 32x32 icon.svg favicon-32.png
convert favicon-16.png favicon-32.png favicon.ico
```
