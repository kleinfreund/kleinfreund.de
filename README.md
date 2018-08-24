# kleinfreund.de

- [Harry Roberts: Manage large CSS projects with ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)

## Eleventy To Do

- Waiting on v0.5.1. See .eleventy.js
- Waiting on [#147](https://github.com/11ty/eleventy/issues/147) so posts with a an `tags` property can be assigned an *additional* collection via a directory-specific data file (i.e. `./posts/posts.json`)
- Waiting on [#184](https://github.com/11ty/eleventy/issues/184) so that I can inline CSS based on whether I’m building for a development or production environment

## Generate icons

```
convert -background none -density 152x152 icon.svg icon.png
convert -background none -density 16x16 icon.svg favicon-16.png
convert -background none -density 32x32 icon.svg favicon-32.png
convert favicon-16.png favicon-32.png favicon.ico
```
