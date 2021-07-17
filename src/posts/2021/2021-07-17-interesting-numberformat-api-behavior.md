---
title: Interesting <code>NumberFormat</code> API behavior
date: 2021-07-17
---
The [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) behaves in an interesting way when fed with invalid input. Its `format` method takes one number argument, but it still “works” if it’s provided with a string argument.

<!--more-->

```js
(new Intl.NumberFormat("de")).format("0.1")
//> "0,1"
```

In essence, you can feed it with string values that look like JavaScript numbers (i.e. values for which `Number.parseFloat` would not return `NaN`). If you provide other values like letters, it returns “NaN”.

```js
(new Intl.NumberFormat("en")).format("x")
//> "NaN"
```

Note that the return value isn’t the special value `NaN` but the *string* value `"NaN"`. Annoyingly, you can’t reliably detect such a failure by checking for strict equality with the string literal `"NaN"` because, and that was quite surprising, the result is *sometimes* localized:

```js
(new Intl.NumberFormat("ru")).format("x")
//> "не число"
```

For some locales, the returned value isn’t “NaN” but rather the translation of the phrase “Not a number” (that’s what “не число” translates to). I’ve tried this in the latest stable versions of Mozilla Firefox and Google Chrome.

I would’ve preferred for calls to `format` with “it doesn’t look like a number” values to either return `null` or `"NaN"` (consistently) or to throw an error. Then, one would be able to detect whether the input is a “nicely formatted number string”.
