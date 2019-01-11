# kleinfreund.de

## Prerequisites

```
npm install
```

## Development

```
npm start
```

## Production

```
npm run build
```

## To Do

- *(nothing)*

## Generate icons

Create a 152×152 px PNG logo out of the SVG file:

```
convert -background none -density 152x152 icon.svg icon.png
```

Create a favicon containing both 16×16 px and 32×32 px versions:

```
convert -background none -density 16x16 icon.svg favicon-16.png \
  && convert -background none -density 32x32 icon.svg favicon-32.png \
  && convert favicon-16.png favicon-32.png favicon.ico \
  && rm favicon-16.png favicon-32.png
```

## Used resources

- [Eleventy documentation](https://www.11ty.io/docs/)
- [Harry Roberts: Manage large CSS projects with ITCSS](http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528)
