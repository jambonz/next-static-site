# Jambonz UI

The Jambonz UI library is a minimal, light-weight UI design package for developing frontends for jambonz apps. It provides a kit-of-parts resource which consists of fonts, a small set of CSS styles, a source set of SASS styles and JavaScript components. Whether you're developing a custom dev stack with tools like [webpack](https://webpack.js.org/) or using a more opinionated scaffold framework (like [vite](https://vitejs.dev/)) you should have no issues utilizing the resources available in the Jambonz UI library package. You can view the available UI elements from the library on this site [here](/jambonz-ui/). Also—this site is using the UI library!

What this is not is an overopinionated UI framework. Jambonz UI aims to provide foundational design materials like colors, fonts and typography as well as [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) materials like buttons, icons etc. Currently the library is very lean but is expected to grow thoughtfully as jambonz frontend development continues to mature along this line of thinking.

A primary goal of the library is to have a small footprint. Current sizes:

| Output format | CSS size | JS size |
|---------------|----------|---------|
| Minified and Gzipped | `2KB` | `2KB` |
| Minified | `10KB` | `9KB` |
| Compiled | `14KB` | `18KB` |

#### Installation

Installing the package is easy. You can use any typical package manager for frontend stacks.

```shell
npm install @jambonz/ui # or yarn add @jambonz/ui
```

#### General usage

The UI kit can be used in any typical way we pull things into our modern frontend stacks. You can import the CSS, SASS and JS directly into your specific target entry points for bundling or you can load them statically the good-old-fashioned way. For the latter the package provides a singular `public` directory that consists of all static assets: CSS, JS and fonts. You can literally just copy these assets into your jambonz applications static directory if you want to. This is also handy for serving extra static assets during development with tools like [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) and also for copying just the raw static assets at build time when bundling.

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/jambonz-ui/fonts/">Next: Fonts</a>
</p>