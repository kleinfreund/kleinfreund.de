---
title: Interesting <code>NumberFormat</code> API behavior
date: 2021-07-17
tags:
- dev
---
The [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) behaves in an interesting way when fed with invalid input. Its `format` method takes one number argument, but it still “works” if it’s provided with a string argument.

<!--more-->

```js
(new Intl.NumberFormat("de")).format("0.1")
//> "0,1"
```

In essence, you can feed it with string values that look like JavaScript numbers (under the hood, it uses the ECMAScript standard’s [`ToNumeric` operation](https://tc39.es/ecma262/#sec-tonumeric)). For other string values like letters, it returns “NaN”.

```js
(new Intl.NumberFormat("en")).format("x")
//> "NaN"
```

Note that the return value isn’t the special value `NaN` but the *string* value `"NaN"`. Annoyingly, you can’t reliably detect such a failure by checking for strict equality with the string literal `"NaN"` because, and that was quite surprising, the result is *sometimes* localized:

```js
(new Intl.NumberFormat("ru")).format("x")
//> "не число"
```

For some locales (e.g. `"ru"`, `"tk"`), the returned value isn’t “NaN” but rather the translation of the phrase “not a number” (that’s what “<span lang="ru">не число</span>” translates to). I’ve tried this in the latest stable versions of Mozilla Firefox and Google Chrome.

I would’ve preferred for calls to `format` with “it doesn’t look like a number” values to either return `null` or `"NaN"` (consistently) or to throw an error. Then, one would be able to detect whether a string value looks like a JavaScript number. Not that this would be very useful. One can already perform this kind of check using `!Number.isNaN(Number(value))`.
