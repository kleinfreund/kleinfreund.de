---
title: Setup Vue.js linting in Visual Studio Code
description: "A step-by-step guide on setting up Vue.js linting in Visual Studio Code"
date: 2019-07-21
tags:
- dev
---
Visual Studio Code provides powerful tooling around languages such as HTML, CSS, and JavaScript. You get useful autocompletion, syntax highlighting, and code validation out of the box. Languages that aren’t as tightly integrated into VS Code need some additional setup.

<!--more-->

These are the necessary steps to setup Vue.js linting in Visual Studio Code. If you use the [Vue CLI](https://cli.vuejs.org/) to generate a Vue project, you can skip steps 1 and 2 because the tool will take care of them.

1. Install the NPM packages `eslint` and `eslint-plugin-vue`.

    ```sh
    npm install --global eslint eslint-plugin-vue
    ```

    If you prefer a local installation:

    ```sh
    npm install --save-dev eslint eslint-plugin-vue
    ```

2. Configure ESLint to use the recommended Vue.js linter rulesets which are provided by `eslint-plugin-vue`.

    The following is an example of a `.eslintrc.json` file. Put it either in your user account’s home directory (if you use a global installation of `eslint`) or in your workspace’s root directory (if you use a local installation).

    ```json
    {
      "parserOptions": {
        "ecmaVersion": 9,
        "sourceType": "module"
      },
      "extends": [
        "plugin:vue/essential"
      ]
    }
    ```

    The important piece is the `"extends"` key referencing `"plugin:vue/essential"`. This tells ESLint which rulesets to use for validating your Vue.js code. For a more strict set of rules, use `"plugin:vue/recommended"`.

3. Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VS Code.
4. Configure the ESLint extension to validate Vue.js code by updating your VS Code settings.

    Edit the settings.json file and add the following:

    ```json
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "vue"
    ]
    ```

    If you already have a setting for `"eslint.validate"` it’s enough to add `"vue"` to the list of languages.
