# kleinfreund.github.io

This is the repository for my personal site [kleinfreund.de](http://kleinfreund.de). I’m using [Jekyll](http://jekyllrb.com) with [GitHub Pages](https://pages.github.com). That way I don’t need to build the site by hand every time I want to push new stuff. GitHub Pages does that for me. Downside? Not being able to use plugins.

## To Do

### Under the hood

- Minify production HTML? Seems like it’s not possible with GHP. MEH =/
- Inline critical CSS with `loadCSS();` (testing this currently)
- Consider using Grunt instead of Gulp

### Site enhancements

- New contact (?) page (story about the current state of how the site is made)
    - wait for: ghp 2.1 / source maps
- Utilize CSS source maps
    - gulp? wait for node-sass issue
    - prepros? wait for: prepros issue

### Posts

- Translate Schilbach post? Maybe not?
<<<<<<< HEAD
- Soundtrack post reloaded?
    - Transistor
    - FTL
    - Machinarium
- about bilingual with `{{ page.lang }}` and Front Matter defaults
    - Uses category for languages (e.g.: `en`)
    - English pages and posts live inside `/en` and `/en/_posts`
    - When creating category pages, one needs to filter out the _language_ categories
=======
- Write more for bbkv post
- Use `{% post_url %}` in jekyll multilingual post
>>>>>>> 07933dc2c0df02624bdfc2dbd50f3d50bd26d401

## License

- Content: [CC BY-SA](http://creativecommons.org/licenses/by-sa/3.0/)
- Code: [MIT](http://opensource.org/licenses/mit-license.php)
