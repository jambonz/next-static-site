jambonz
=======

> The "bring your own everything" CPaaS

![](/public/jambonz.png)

## Deploy targets

This app can easily be deployed to multiple targets including Vercel, Netlify or AWS+circleci.

- Vercel
  - [jambonz.vercel.com](https://jambonz.vercel.app)
- AWS+circleci
  - Could easily be implemented as in this repo [here](https://github.com/kitajchuk/punxy#aws--circleci).

## Dev start

Clone this repository and install [yarn](https://yarnpkg.com/getting-started/install). From app root:

- `yarn install`
  - Installs node packages
- `yarn dev`
  - Serves local dev at [localhost:3000](http://localhost:3000)

Other packages being used prominently in this apps source code are [classnames](https://www.npmjs.com/package/classnames) and [nanoid](https://www.npmjs.com/package/nanoid#react).

## Jambonz UI library

This app is being composed in the manor of `module > component > element`, wherein a page is a module which is made up of components that are comprised of elements. We are using [Next.js](https://nextjs.org) [SASS](https://nextjs.org/learn/basics/assets-metadata-css/css-styling) located in the `styles` directory and loaded globally in [pages/_app.js](/pages/_app.js). A generally simple BEM CSS module naming convention is being used prominently. JS components are in the `components` directory. The `jambonz-ui` component consists of reusable design element components.

You can view examples of the Jambonz UI component elements on this page [here](https://jambonz.vercel.app/jambonz-ui).

## Static page data

We are using static data with [yamljs](https://www.npmjs.com/package/yamljs) and [Next.js static props](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation). Data files are located in the `data` directory. There's a JS data utility in `lib/data.js` that provides a method for "fetching" the static data for use with a Next.js pages async `getStaticProps` SSR method.

## Jambonz developer docs

The project is using [Nextra.js](https://nextra.vercel.app) which provides a stylized developer docs theme for Next.js. We are loading theme CSS styles with the `styles/_nextra.scss` partial. It is being used to hide the frontend page links from the Nextra sidebar nav as there is currently no way to do this using pure nextra config. There is a [Github issue here](https://github.com/shuding/nextra/issues/59) referring to "Page exclusion from docs".
