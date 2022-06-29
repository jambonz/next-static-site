# Fonts and icons

The point of the Jambonz UI library is for jambonz apps to be "on brand" and share a cohesive foundational design DNA. With that in mind, the official font family for jambonz is called [Objectivity](https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family). Objectivity is a free, open-source font available for download online. The UI kit provides the font files already optimized for web use in the `woff` format. Jambonz doesn't utilize every member of the font family but you can view the full font specimen [here](https://www.fontsquirrel.com/fonts/objectivity).

###### Available fonts for web use:

| Font | File | SASS Variable |
|------|------|---------------|
| Objectivity Regular | `objectivity-regular-webfont.woff(2)` | `$font-regular` |
| Objectivity Regular Slanted | `objectivity-regularslanted-webfont.woff(2)` | `$font-regular-italic` |
| Objectivity Medium | `objectivity-medium-webfont.woff(2)` | `$font-medium` |
| Objectivity Medium Slanted | `objectivity-mediumslanted-webfont.woff(2)` | `$font-medium-italic` |
| Objectivity Bold | `objectivity-bold-webfont.woff(2)` | `$font-bold` |
| Objectivity Bold Slanted | `objectivity-boldslanted-webfont.woff(2)` | `$font-bold-italic` |

###### Loading the fonts

Fonts can be copied from the package to your static public directory. This can be done manually, at installation time or during app bundling depending on your preference. The package provides a singular `public` directory that consists of all static assets: CSS, JS and fonts. You can literally just copy these assets into your jambonz applications static directory if you want to.

###### Examples

For this [Next.js](https://nextjs.org/) app you're on right now we do this with the `postinstall` script in the `package.json` file. We are also opting to ignore the `fonts` directory inside of `public` since the fonts are always copied during `install` which works locally and in CI.

```json
{
  "scripts": {
    "postinstall": "rm -rf public/fonts && cp -R ./node_modules/@jambonz/ui/public/fonts ./public/fonts"
  }
}
```

Of course you can serve them statically in development and bundle them at build time if you're using a tool like [webpack](https://webpack.js.org/). See the documentation on [devServer](https://webpack.js.org/configuration/dev-server/#devserverstatic) and check out the [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin) for resources on how to handle this. Beyond this the expectation is that you have a good handle on how you can get the static fonts into your jambonz app.

Example of dev server config:

```js
module.exports = {
  // ...
  devServer: {
    static: [path.resolve(__dirname, 'node_modules/@jambonz/ui/public')],
  },
};
```

Example of copy plugin config:

```js
module.exports = {
  // ...
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/@jambonz/ui/public'),
          // If you would like to omit the CSS/JS and only copy fonts
          globOptions: {
            ignore: ['**/css/**', '**/js/**'],
          },
        },
      ],
    }),
  ],
};
```

###### Feather icons

Jambonz UI utilizes [feathericons](https://feathericons.com/), an open-source icon library available in many formats for implemention into frontend stacks. While feather has 280+ available icons the Jambonz UI library only imports and thus provides a small subset of those from [react-feather](https://github.com/feathericons/react-feather). This allows for tree-shaking to take effect and ensures we don't load extra bloat into our dist JS that isn't explicitly used. As use cases arise we can, and will, pull more icons into the main package. For now you can use the following icons in your jambonz apps. For more information see docs on the [Icon component](/docs/jambonz-ui/components/).

###### Available default icons:

- `X`
- `Lock`
- `Send`
- `Menu`
- `Phone`
- `Heart`
- `Cloud`
- `Server`
- `Layers`
- `Folder`
- `GitHub`
- `MapPin`
- `XCircle`
- `ThumbsUp`
- `Activity`
- `UserCheck`
- `PhoneCall`
- `ChevronUp`
- `CheckCircle`
- `ChevronDown`
- `ChevronRight`
- `ExternalLink`

<p class="flex">
<a href="/docs/jambonz-ui/getting-started/">Prev: Getting started</a>
<a href="/docs/jambonz-ui/styles/">Next: Styles</a>
</p>