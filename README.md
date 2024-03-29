<p align="center">
  <a href="https://jambonz.org">
    <img src="./public/icon192.png" height="128">
    <h1 align="center">jambonz.org</h1>
  </a>
</p>

<p align="center">
  <a aria-label="GitHub CI" href="https://github.com/jambonz/next-static-site/actions/workflows/main.yml">
    <img alt="" src="https://github.com/jambonz/next-static-site/actions/workflows/main.yml/badge.svg">
  </a>
</p>

## The stack

This app is a [Next.js](https://nextjs.org) site deploying on [Vercel](https://vercel.com).

- [jambonz.vercel.app](https://jambonz.vercel.app)

### Commands

- `npm i`
  - Installs packages and setup husky
- `npm run dev`
  - Serves local dev at [localhost:3000](http://localhost:3000)
- `npm run lint`
  - Runs Next.js linting
- `npm run build && npm run start`
  - Create an optimized Next.js production build and serve it locally
- `npm run build && npm run export`
  - Create a static production export for any static deploy target

## Jambonz UI library

Head on over to the [jambonz-ui](https://github.com/jambonz/jambonz-ui) repo for full documentation. 
Also check out the [jambonz-ui docs](https://jambonz.org/docs/jambonz-ui/) as a more 
in-depth resource.

### UI Design

This app is being composed in the manor of `module > component > element`, wherein a page is a 
module which is made up of components that are comprised of elements. We are using [Next.js](https://nextjs.org) 
[SASS](https://nextjs.org/learn/basics/assets-metadata-css/css-styling) located in the `src/styles` 
directory and loaded globally in [pages/_app.js](/pages/_app.js). JS components are in the `src/components` 
directory. The `jambonz-ui` component library consists of reusable design element components.

### Styling

We are using the [BEM](http://getbem.com/) style for our CSS/SASS system. Please review current 
implementations in `src/styles` and take the time to understand the BEM style in order to properly 
name and design your components styling.

### Typography

You should always use the reusable components from the `jambonz-ui` component library. 
These typographic components implement our type-scale for our design system. When styling 
pages in which we want to adjust or tweak the type-scale you should always use the `mixins` 
provided in the SASS. This ensures when we decide to break out of our standard type-scale 
implementation for any given element(s) we retain a harmonious nature to our type sizing 
as it retains its responsive nature provided by the `mixins`. A perfect example of how we 
have already done this is for the `_text-layout` page(s) wherein we've chosen to have the 
`p` element implement the `ms()` mixin and likewise the `li` element(s) implementing the 
`ms()` mixin as well.

## Static page data

We are using static data with [yamljs](https://www.npmjs.com/package/yamljs) and 
[Next.js static props](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation). 
Data files are located in the `data` directory. There's a JS data utility in `lib/data.js` 
that provides a method for "fetching" the static data for use with a Next.js pages async 
`getStaticProps` SSR method.

## Markdown data

The project is generating some dynamic layouts with markdown files using static file JS 
utilities alongside Next.js static paths/props system. We are leveraging their 
[catch-all](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) dynamic 
routes logic. Example located at `pages/docs/[[...slug]].js`. The markdown files are in the 
`markdown` directory organized by subfolders. The markdown navigation structure is controlled 
in the relevant page YAML data located in the `data` directory for each `markdown` subfolder. 
You can create markdown files at will but they will not render in the sidebar nav until they 
are also added to the nav structure in the relevant `data` file. For example, the markdown files 
for the developer docs are located at `markdown/docs/...` and the YAML data for this layout 
is located at `data/docs.yml`.

We are using [remark](https://github.com/remarkjs/remark), [remark-html](https://github.com/remarkjs/remark-html) 
and [remark-gfm](https://github.com/remarkjs/remark-gfm) as well as [gray-matter](https://github.com/jonschlinkert/gray-matter) 
for parsing the docs markdown files. Code syntax highlighting is done with [prismjs](https://prismjs.com) 
and the associative babel config is in the `.babelrc` file. It's important to leave the preset 
in this file that merges our config with `next/babel` so Next.js works properly.

## Testing

*Note cypress test suite is still a work in progress*

You can run e2e tests for the site using [Cypress](https://docs.cypress.io). Cypress specs 
rely on running the Next.js site on port `3000` as the baseUrl so the best way to test locally 
is to `npm run dev` in one shell and then `npm run test` in another shell. Optionally, you can 
`npm run build && npm run start` to create an optimized production server locally and in another 
shell run `npm run test`. The GitHub workflow for this repository runs the Cypress tests by 
building and then starting Next.js in the background like `npm run build && (npm run start&) > /dev/null` 
and then `npm run test`.

Cypress specs are located at `cypress/integration/...`. The source of truth static YAML data 
should always be used when authoring Cypress tests so we've implemented a script that generates 
`JSON` data fixtures for Cypress from the YAML data before tests are run. When running `npm run test` 
what happens is:

* A `pretest` script runs and generates the JSON fixtures for Cypress
* The Cypress tests are run in headless mode
* A `posttest` script runs and performs cleanup on the Cypress fixtures
