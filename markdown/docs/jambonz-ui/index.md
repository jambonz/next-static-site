# Jambonz UI

A minimal, light-weight UI design system for developing frontends for jambonz apps.
It's a kit-of-parts including fonts, a small set of CSS styles, a source set of SASS
styles and JavaScript components. Whether you're developing a custom dev stack with tools
like [vite](https://vitejs.dev/) or [webpack](https://webpack.js.org/) you should have no
issues utilizing the resources available in the Jambonz UI library package.

Jambonz UI aims to provide foundational design materials like colors, fonts and typography
as well as [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) materials like
buttons, icons etc. Currently the library is very lean but is expected to grow thoughtfully
as jambonz frontend development continues to mature along this line of thinking. A primary goal
of the library is to have a small footprint.

View on [bundlephobia](https://bundlephobia.com/package/jambonz-ui).

View the [storybook](https://jambonz-ui.vercel.app/).

##### Installation

Installing the package is easy. You can use any typical package manager for frontend stacks.

```shell
npm install jambonz-ui # or yarn add jambonz-ui
```

##### General usage

The UI kit can be used in any typical way we pull things into our modern frontend stacks.
You can import the CSS, SASS and JS directly into your specific target entry points for bundling
or you can load them statically the good-old-fashioned way. For the latter the package provides
a singular `public` directory that consists of all static assets: CSS, JS and fonts. You can
literally just copy these assets into your jambonz applications static directory if you want.
This is also handy for serving extra static assets during development with tools like
[webpack-dev-server](https://webpack.js.org/configuration/dev-server/) and also for copying just
the raw static assets at build time when bundling.

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/jambonz-ui/fonts-and-icons/">Next: Fonts and icons</a>
</p>
