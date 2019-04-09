---
title: CSS-only dark mode
description: "An in-depth analysis of a CSS-only dark mode implementation by Mu-An Chiou and its further development using CSS custom properties"
date: 2019-04-08
tags:
- dev
---
Recently, I stumbled over [Mu-An Chiou’s cool little website](https://muan.co/) and was inspired to redo my own. But first, I did a bit of view-sourcing of her neat no-JavaScript dark mode implementation. Let’s have a look at it and by that I mean a detailed analysis. From there, we will implement our own dark mode step by step.

<!--more-->

A checkbox at the top of her site enables a dark mode. In essence, it swaps around some colors so that after enabling dark mode, light text sits on a dark background where before the body text was dark and the background light.

A bit of JavaScript is used to store the user’s choice via the [`localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). That’s just a form of progressive enhancement and is not required for the functionality of switching to dark mode.

The [CSS-only dark mode](https://codepen.io/kleinfreund/pen/bJwqpB) we’re building in this article is available on CodePen.



### Interface design

Consider the choice of the interactive element from an interface design perspective. The objective is to switch between two states, dark mode disabled and dark mode enabled. Optionally, that state is saved across sessions. The available components that are suitable for such a task are checkboxes, switches, and toggles. All three allow the correct form of interaction where the initial state is “dark mode, not enabled”, and by interacting with the control, the state is changed to “dark mode, enabled”.

More precisely, for a checkbox or switch, the initial state is “dark mode, unchecked”, and for a toggle button it is “dark mode, unpressed”. Screen readers that support the relevant features (e.g. `role="switch"` or `aria-pressed`) will announce the type of control accordingly. More information [on the topic of toggle buttons and switches](https://inclusive-components.design/toggle-button/) can be found in Heydon Pickering’s fantastic resource about inclusive components.

Note how none of the controls deal with a notion of a light mode. It is implied that if the control was not interacted with, the dark mode is disabled; hence, the current mode must be a light mode. Of course, any mode that is lighter than the dark mode would fit the bill as well.

In a different context where many controls are part of a more complex widget like a settings page, it must also be considered what users expect when interacting with these controls. In particular, since the choice of enabling the dark mode should be saved, we have to ask *when exactly* such an interaction is saved. Does one have to confirm a changed setting by hitting a “Save” button or are things saved automatically?

A [quick rundown on when the three controls we discussed save their state](https://twitter.com/ZoeBijl/status/1113041012472102912) was provided recently by Zoë Bijl. They were also responsible for [the choice of link text](https://twitter.com/ZoeBijl/status/1114095351626178560) in the previous section 👍.



### Design objectives & constraints

I assume Mu-An chose a checkbox for one reason: Both switches and toggles require JavaScript to work; thus, it would not be possible to provide a dark mode to users who have JavaScript disabled. For a pure CSS implementation, however, it’s necessary to observe a user interacting with the page from within a stylesheet. Let’s have a look at some options.

There is a series of CSS pseudo-class selectors allowing you to react to a user interaction. For example, the `:hover` pseudo-class selector is triggered when an element is hovered. However, a dark mode would not be very useful if it was only active for the duration a user hovers over a certain element. A more permanent way of reacting to a user interaction with CSS is the [`:target` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:target). However, this feature observes only interactions related to page navigation with URLs containing fragment identifiers. Enabling the dark mode would only last as long as no other link that opens in the same window is used. Not practical.

The only reasonable choice is the [`:checked` pseudo-class selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) which allows styling a checkbox (or radio button) based on it’s checked state. Checkboxes also happen to be one of the possible interactive components that suit our purpose anyway. Therefore, using checkboxes and the `:checked` selector for theming is an adequate choice and *not* a hack.



### The cascade and branch hopping

Before we look into the actual theming of a web page, I will take a step back and elaborate on some technical constraints imposed on web developers by the way CSS and its selectors work.

Remember how the “C” in CSS stands for “Cascading”? Here is one way of describing it: Some aspects of a CSS ruleset affect the DOM node it is applied to **and potentially all descendant DOM nodes of that node**. Take the following markup as an example:

```html
<label for="coolbox">
  <input id="coolbox" type="checkbox">
  Subscribe to <i>very</i> important newsletter
</label>
```

Styling the label potentially affects its descendants:

```css
label {
  margin: 1.5rem;
  color: tomato;
}
```

If you’ve written CSS for a while, you will likely make one crucial distinction here: You expect the `color` property to apply to the whole label *and all of its descendants*, but you expect the `margin` property to apply to the label *and none of its descendants*. In particular, you don’t expect the `i` element to suddenly have a margin to its sides while surely it has to be colored `tomato`. That’s the cascade. Some CSS properties are inherited by elements from their ancestor elements (e.g. the `i` element inherits the `color` property from the `label` element.) and some aren’t (like the `margin` property).

This means that the cascade allows CSS rules that apply to an element to affect its descendant elements. Inheritance only goes down the DOM tree. An element’s sibling or ancestor elements cannot inherit properties from that element. But there still can be some form of dependency.

Entering general (`~`) and adjacent (`+`) sibling combinators.

```css
input ~ i {
  color: cornflowerblue;
}
```

Before, with the CSS from above, the whole label would be colored `tomato`. Now, all `i` elements following any `input` element will be colord `cornflowerblue`. “Following” here means that they’re on the same level in the DOM. The DOM fragment currently looks like this (omitting some whitespace-only nodes):

- `label`
  - `input`
  - #text: `Subscribe to `
  - `i`
    - #text: `very`
  - #text: ` important newsletter`

Here, the node with the `i` element and the two of the three text nodes “follow” the `input` element. The third text node containing the string “very” is not on the same level as the others; thus, it is not a following (or succeeding) node.

Remember how we settled for checkboxes because there is a `:checked` pseudo-class selector? When a checkbox is checked, the `input:checked` selector can be used to set styles specific to the checked state. Likewise, `input:not(:checked)` can be used to style a checkbox if it is not checked. Let’s combine the general sibling combinator with the `:checked` pseudo-class selector:

```css
input:checked ~ i {
  color: cornflowerblue;
  font-weight: bold;
}
```

Now, I don’t know about you, but I think that’s immensely cool. Checking the checkbox changes properties of a DOM node that is not a descendant but a sibling 🤯! This very fact is the foundation for Mu-An’s CSS-only dark mode.



### The basic markup

We need a checkbox and a *succeeding sibling* element of that checkbox so that we can alter the sibling element via the `:checked` pseudo-class selector.

```html
<input class="dark-mode-checkbox" id="dark-mode" type="checkbox">

<div class="theme-container grow">
  <label for="dark-mode">
    <span class="dark-mode-label">
      Dark mode
    </span>
  </label>

  Put all your content in here.
</div>
```

First, the weird parts. Admittedly, having the label neither be a parent or sibling element of the `input` element feels very awkward. I’ve never had a use case for doing it like this. The important thing is that the label is associated to the control via the `for` attribute. Always do this to make sure assistive technology can announce the control with the label text. Even if you put the `input` inside the `label` element, it’s not guaranteed that all assistive technology actually generate a correct label.

As its name suggests, the `div.theme-container` will be used to switch the colors around for the dark mode. Since the label is part of it, we don’t need to target it explicitly for this purpose. That’s why I put the label inside the theme container. If that bothers you, you can move it just after the `input` element.



### Theming with custom properties

That’s right, CSS custom properties 🤗. We will make use of the cascade and the fact that all custom properties are inherited. The following CSS shows how, based on the checkbox’s checked state, we override a set of custom properties responsible for the color theme.

```css
:root {
  /* Light theme */
  --c-light-text: #333;
  --c-light-background: #fff;
  --c-light-focus: deepskyblue;
  --c-light-interactive: mediumvioletred;

  /* Dark theme */
  --c-dark-text: #fff;
  --c-dark-background: #333;
  --c-dark-focus: deeppink;
  --c-dark-interactive: palegreen;
}

.theme-container {
  /* Make the light theme the default */
  --c-text: var(--c-light-text);
  --c-background: var(--c-light-background);
  --c-focus: var(--c-light-focus);
  --c-interactive: var(--c-light-interactive);

  color: var(--c-text);
  background-color: var(--c-background);
}

.dark-mode-checkbox:checked ~ .theme-container {
  /* Override the default theme */
  --c-text: var(--c-dark-text);
  --c-background: var(--c-dark-background);
  --c-focus: var(--c-dark-focus);
  --c-interactive: var(--c-dark-interactive);
}

:focus,
.dark-mode-checkbox:focus ~ .theme-container .dark-mode-label {
  outline: 2px solid var(--c-focus);
}

a {
  color: var(--c-interactive);
}
```

Note how the theme-specific custom properties are only used when switching the theme with the `:checked` pseudo-class selector. By assigning them to a set of general custom properties *that are not specific to the theme*, we avoid repeating a lot of CSS. Without custom properties, we would need to write every property declaration involving theming twice.

Computer scientists would probably call this technique dependency injection. I think. Maybe. Isn’t that what it is?

The ruleset for links sets the `color` property with a general custom property. The value of that custom property is itself a custom property, one that’s specific to the theme, and the value of *that* property is what is changed when checking the checkbox. I think that’s beautiful.



### Move the checkbox to the dark side

Currently, the checkbox and its label aren’t visually associated with each other. Also, the checkbox is unaffected by our theme. This is an unfortunate tradeoff with the CSS-only dark mode. We will supply an alternative box next to the label and visually hide the original.

```html
<input class="dark-mode-checkbox visually-hidden" id="dark-mode" type="checkbox">

<!-- … -->
```

```css
.dark-mode-label::before {
  content: "\2610";
}

.dark-mode-checkbox:checked ~ .theme-container .dark-mode-label::before {
  content: "\2611";
}

/*
visibility-hidden utility class

Source: https://github.com/h5bp/html5-boilerplate

Hide only visually, but have it available for screen readers:
https://snook.ca/archives/html_and_css/hiding-content-for-accessibility

1. For long content, line feeds are not interpreted as spaces
   and small width causes content to wrap 1 word per line:
   https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
*/
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  white-space: nowrap; /* 1. */
}
```

<p class="note note--info">
  Note that we don’t want to hide the dark mode switcher from assistive technology. Some users might use screen readers and may in fact be blind; others may only be partially blind or not blind at all.
</p>



### Cover the full viewport

You might notice how the dark theme doesn’t cover the whole viewport with a dark background color. This problem was surprisingly hard to workaround before we had access to flexbox. Now, searching for “CSS sticky footer” should give you a variety of ways to tackle this. Here is one:

```html
<!-- … -->

<div class="theme-container grow">
  <!-- … -->
</div>
```

```css
/*
1. Allows the body’s children
   to grow to 100%
   of the viewport’s height.
*/
html,
body {
  height: 100%; /* 1. */
}

/*
1. Allows the content area
   to grow to the viewport height.
*/
body {
  display: flex; /* 1. */
  flex-direction: column; /* 1. */
}

/*
1. Grows the content area
   to take up all the remaining height
   inside the body element.
*/
.grow {
  flex-grow: 1; /* 1. */
}
```



### Store the user’s preference

Just a couple of lines of JavaScript are needed to save the current mode in the user’s browser. When they re-visit the page, the mode that was selected the last time they visited will be used.

```js
document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.querySelector('.dark-mode-checkbox');

  checkbox.checked = localStorage.getItem('darkMode') === 'true';

  checkbox.addEventListener('change', function (event) {
    localStorage.setItem('darkMode', event.currentTarget.checked);
  });
});
```



---

That’s it. With that, the next re-design of my website will probably include a dark mode checkbox.

A full implementation of the [CSS-only dark mode](https://codepen.io/kleinfreund/pen/bJwqpB) is available on CodePen.
