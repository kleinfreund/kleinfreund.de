# kleinfreund.de

## Development

Install the project's dependencies.

```sh
npm install
```

Start a local development server.

```sh
npm start
```

### Generate favicon

Create a 48×48 px favicon out of an SVG file:

```sh
magick -background none -density 48x48 icon.svg favicon.ico
```

### Update vinyl collection

Run the following package script:

```sh
npm run build:vinyl-collection-data
```

Commit any changed files resulting from this step.

## Deploy

Push updates to the project's default branch. This will trigger a GitHub action deploying the site.
