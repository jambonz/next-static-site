jambonz
=======

> The "bring your own everything" CPaaS

[![CI](https://github.com/jambonz/next-static-site/actions/workflows/main.yml/badge.svg)](https://github.com/jambonz/next-static-site/actions/workflows/main.yml)

![](/public/jambonz.png)

## Stack

- [Next.js](https://nextjs.org)

## Deploy target(s)

This app is currently deploying on [Vercel](https://vercel.com).

- [jambonz.vercel.app](https://jambonz.vercel.app)

## Dev start

Clone this repository and install [yarn](https://yarnpkg.com/getting-started/install). ***Important for developers: Run a fresh `yarn install` and make sure [Husky](https://typicode.github.io/husky/) installs on your local machine*** Your terminal output will show that husky has been installed after yarn resolves packages, something like this:

<img src="/public/husky_screenshot.png" width="224" height="auto" />

### Commands

- `yarn install`
  - Installs node packages
  - Installs [husky](https://typicode.github.io/husky/) for git `pre-commit` hooks
  - Husky will run `yarn build` before a git commit and stop the commit if `lint` or `build` fails
- `yarn dev`
  - Serves local dev at [localhost:3000](http://localhost:3000)
- `yarn lint`
  - Runs [ESLint](https://eslint.org/) validations on source JS
  - Install the [ESLint plugin for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint&ssr=false#overview)
- `yarn build && yarn start`
  - Create an optimized Next.js production build and serve it locally
- `yarn build && yarn export`
  - Create a static production export for any static deploy target

## Jambonz UI library

To work on the UI library:

```shell
# preinstall will build and package
yarn

# to pull newly built package into Next.js
yarn up

# that's it, now you can
yarn dev
```

You can view examples of the Jambonz UI component elements on this page [here](https://jambonz.org/jambonz-ui/). The `./jambonz-ui` directory is the source for the published package `@jambonz/ui`. This is a component library of fonts, typographic styles and atomic design elements made reusable for various jambonz apps. More detailed documentation for using this library is TBD, but for now here's some notes on how it's used here in the `Next.js` app.

The package is included as a dependency in our `package.json` file. Since this repo is the current source for the UI library, we reference it locally. However if you were to use this UI library on another jambonz app you would include it specifying the appropriate semver:

```json
"dependencies": {
  "@jambonz/ui": "./jambonz-ui/pkg/"
}
```

Fonts are copied from the `node_module` package to the `public` director where they are ignored by `git`. The going assumption here is that you should be building a simple frontend web app and you really ought to just put the `fonts` in a public, static directory called `fonts`. We do this with the `postinstall` script in the `package.json` file:

```json
{
  "scripts": {
    "postinstall": "cp -R ./node_modules/@jambonz/ui/fonts ./public/fonts"
  }
}
```

The core package styles can be loaded via the distributed CSS file. For this `Next.js` app we do this in `./pages/_app.js` but you can do this in any JS entry point for another jambonz app:

```js
import '@jambonz/ui/css/styles.css';
```

The core package SASS variables and mixins can be loaded via the main partials included with the package. We do that for this app in `./src/styles/global.scss`:

```css
@import '../../node_modules/@jambonz/ui/styles/vars';
@import '../../node_modules/@jambonz/ui/styles/mixins';
```

Lastly, you can import any of the reusable atomic design components for use in your jambonz React/Preact applications. Note that the [classNames](./jambonz-ui/utils.js) method here is NOT the widely used package from `npm` but rather a very simple local utility used inside of the UI library and exposed for use in your app JS as well:

```js
import { Button, Icon, classNames } from '@jambonz/ui';
```

### Jambonz Design

This app is being composed in the manor of `module > component > element`, wherein a page is a module which is made up of components that are comprised of elements. We are using [Next.js](https://nextjs.org) [SASS](https://nextjs.org/learn/basics/assets-metadata-css/css-styling) located in the `src/styles` directory and loaded globally in [pages/_app.js](/pages/_app.js). JS components are in the `src/components` directory. The `@jambonz/ui` component library consists of reusable design element components.

### Jambonz Styling

We are using the [BEM](http://getbem.com/) style for our CSS/SASS system. Please review current implementations in `src/styles` and take the time to understand the BEM style in order to properly name and design your components styling.

### Jambonz Typography

You should always use the reusable components from the `@jambonz/ui` component library. These typographic components implement our type-scale for our design system. When styling pages in which we want to adjust or tweak the type-scale you should always use the `mixins` provided in the SASS. This ensures when we decide to break out of our standard type-scale implementation for any given element(s) we retain a harmonious nature to our type sizing as it retains its responsive nature provided by the `mixins`. A perfect example of how we have already done this is for the `_text-layout` page(s) wherein we've chosen to have the `p` element implement the `ms()` mixin and likewise the `li` element(s) implementing the `ms()` mixin as well.

### Testing

*Note cypress test suite is still a work in progress*

You can run e2e tests for the site using [Cypress](https://docs.cypress.io). Cypress specs rely on running the Next.js site on port `3000` as the baseUrl so the best way to test locally is to `yarn dev` in one shell and then `yarn test` in another shell. Optionally, you can `yarn build && yarn start` to create an optimized production server locally and in another shell run `yarn test`. The GitHub workflow for this repository runs the Cypress tests by building and then starting Next.js in the background like `yarn build && (yarn start&) > /dev/null` and then `yarn test`.

Cypress specs are located at `cypress/integration/...`. The source of truth static YAML data should always be used when authoring Cypress tests so we've implemented a script that generates `JSON` data fixtures for Cypress from the YAML data before tests are run. When running `yarn test` what happens is:

* A `pretest` script runs and generates the JSON fixtures for Cypress
* The Cypress tests are run in headless mode
* A `posttest` script runs and performs cleanup on the Cypress fixtures

## Static page data

We are using static data with [yamljs](https://www.npmjs.com/package/yamljs) and [Next.js static props](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation). Data files are located in the `data` directory. There's a JS data utility in `lib/data.js` that provides a method for "fetching" the static data for use with a Next.js pages async `getStaticProps` SSR method.

## Markdown data

The project is generating some dynamic layouts with markdown files using static file JS utilities alongside Next.js static paths/props system. We are leveraging their [catch-all](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) dynamic routes logic. Example located at `pages/docs/[[...slug]].js`. The markdown files are in the `markdown` directory organized by subfolders. The markdown navigation structure is controlled in the relevant page YAML data located in the `data` directory for each `markdown` subfolder. You can create markdown files at will but they will not render in the sidebar nav until they are also added to the nav structure in the relevant `data` file. For example, the markdown files for the developer docs are located at `markdown/docs/...` and the YAML data for this layout is located at `data/docs.yml`.

We are using [remark](https://github.com/remarkjs/remark), [remark-html](https://github.com/remarkjs/remark-html) and [remark-gfm](https://github.com/remarkjs/remark-gfm) as well as [gray-matter](https://github.com/jonschlinkert/gray-matter) for parsing the docs markdown files. Code syntax highlighting is done with [prismjs](https://prismjs.com) and the associative babel config is in the `.babelrc` file. It's important to leave the preset in this file that merges our config with `next/babel` so Next.js works properly.
