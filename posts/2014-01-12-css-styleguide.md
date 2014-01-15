# CSS Styleguide

This is my personal CSS Styleguide.

## Naming

* Everything is lowercase
* ID and class names are dash-delimited (exception: BEM syntax)
* Don't use BEM if it doesn't provide any benefits (No need for `site__nav`, `page__foot` in the most cases)
* Name things as short as possible but as long as necessary:<br>
  E.g. `.site-nav {` instead of `.site-navigation {`

## Coding

* Write one declaration per line
* Intend by 4 spaces (no tabs)
* Don't leave trailing whitespaces
* End each property declaration with a `;`
* One space before `{` in rule declarations and after `:` in property declarations

  ```css
  [selector] {
      [property]: [value];
  }
  ```

* Align vendor-prefixed properties and values properly

  ```css
  *, *:before, *:after {
      -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
              box-sizing: border-box;
  }
  ```

* Use hex-based color values instead of `rgb()`
* Use short hex values like `#f60` instead of `#ff6600`
* Group similar type selectors together

  ```css
  h1, h2, h3, h4, h5, h6 {
      color: khaki;
  }
  ```
