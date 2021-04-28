jambonz
=======

> The "bring your own everything" CPaaS

![](/public/jambonz.png)

## Deploy targets

This app can easily be deployed to multiple targets including Vercel, Netlify or AWS+circleci.

- Vercel
  - [jambonz.vercel.app](https://jambonz.vercel.app)

## Dev start

Clone this repository and install [yarn](https://yarnpkg.com/getting-started/install). From app root:

- `yarn install`
  - Installs node packages
- `yarn dev`
  - Serves local dev at [localhost:3000](http://localhost:3000)
- `yarn lint`
  - Runs [ESLint](https://eslint.org/) validations on source JS
  - ESLint errors will fail your builds so check your code before pushing
  - Install the [ESLint plugin for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint&ssr=false#overview)
- `yarn build && yarn start`
  - Create an optimized Next.js production build and serve it locally
- `yarn build && yarn export`
  - Create a static production build for any static deploy target 

Other packages being used prominently in this apps source code are [classnames](https://www.npmjs.com/package/classnames) and [nanoid](https://www.npmjs.com/package/nanoid#react).

## Jambonz UI library

This app is being composed in the manor of `module > component > element`, wherein a page is a module which is made up of components that are comprised of elements. We are using [Next.js](https://nextjs.org) [SASS](https://nextjs.org/learn/basics/assets-metadata-css/css-styling) located in the `styles` directory and loaded globally in [pages/_app.js](/pages/_app.js). A generally simple BEM CSS module naming convention is being used prominently. JS components are in the `components` directory. The `jambonz-ui` component library consists of reusable design element components.

You can view examples of the Jambonz UI component elements on this page [here](https://jambonz.vercel.app/jambonz-ui).

#### Jambonz Typography

You should always use the reusable components from the `jambonz-ui` component library. These typographic components implement our type-scale for our design system. When styling pages in which we want to adjust or tweak the type-scale you should always use the `mixins` provided in the SASS. This ensures when we decide to break out of our standard type-scale implementation for any given element(s) we retain a harmonious nature to our type sizing as it retains its responsive nature provided by the `mixins`. A perfect example of how we have already done this is for the `docs` page(s) wherein we've chosen to have the `h1` element implement the `h2()` mixin and likewise the `h2` element to implement the `h3()` mixin. We even have the `li` element(s) implementing the `ms()` mixin.

## Static page data

We are using static data with [yamljs](https://www.npmjs.com/package/yamljs) and [Next.js static props](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation). Data files are located in the `data` directory. There's a JS data utility in `lib/data.js` that provides a method for "fetching" the static data for use with a Next.js pages async `getStaticProps` SSR method.

## Jambonz developer docs

The project is generating developer docs from markdown files using static file JS utilities alongside Next.js static paths/props system. We are leveraging their [catch-all](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) dynamic routes logic located at `pages/docs/[[...slug]].js`. The markdown files are in the `docs` directory. The docs structure is controlled in the docs page YAML data located in `data/docs.yaml`. You can create docs markdown files at will in the `docs` directory but they will not render in the sidebar nav until they are also added to the nav structure in this file.

We are using [remark](https://github.com/remarkjs/remark) & [remark-html](https://github.com/remarkjs/remark-html) as well as [gray-matter](https://github.com/jonschlinkert/gray-matter) for parsing the docs markdown files. Code syntax highlighting is done with [prismjs](https://prismjs.com) and the associative babel config is in the `.babelrc` file. It's important to leave the preset in this file that merges our config with `next/babel` so Next.js works properly.
