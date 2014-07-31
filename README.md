# kleinfreund.github.io

This is the repository for my personal site [kleinfreund.de](http://kleinfreund.de). I’m using [Jekyll](http://jekyllrb.com) with [GitHub Pages](https://pages.github.com). That way I don’t need to build the site by hand every time I want to push new stuff. GitHub Pages does that for me. Downside? Not being able to use plugins.

## To Do

### Under the hood

- Using `layout: null` in feed.xml and 404.html instead of `nil`

### Site enhancements

- New contact (?) page (story about the current state of how the site is made)
    - wait for: ghp 2.1 / source maps
- Utilize CSS source maps
    - gulp? wait for node-sass issue
    - prepros? wait for: prepros issue

### Posts

- Translate Schilbach post? Maybe not?
- about bilingual with `{{ page.lang }}` and Front Matter defaults
    - Uses category for languages (e.g.: `en`)
    - English pages and posts live inside `/en` and `/en/_posts`
    - When creating category pages, one needs to filter out the _language_ categories

## License

- Content: [Creative Commons – Attribution-ShareAlike](http://creativecommons.org/licenses/by-sa/3.0/)
- Code: [MIT](http://opensource.org/licenses/mit-license.php)
