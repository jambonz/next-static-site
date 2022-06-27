# Styles

Jambonz UI styles are provided a couple of ways. The raw source for the styles is [SASS]() so if you're also using SASS you have the beneficial ability to directly import either all the UI SASS or just the variables and mixins for use extending the UI kit in your jambonz app. If you import all the SASS you don't need to use the raw CSS anywhere in your app. The imported SASS will compile into your final CSS output.

###### Loading the CSS

You can load the raw CSS directly into your app with a `<link>` tag if you prefer that method. It is provided compiled, minified and minified + gzipped. Assuming you've copied the CSS from the `public` directory provided with the package into your own static directory and renamed it `jambonz-ui.css`:

```html
<!-- loading the minified CSS -->
<link rel="stylesheet" href="/css/jambonz-ui.css" />
```

You can also import the CSS directly into your jambonz app entry point (JS) as most bundlers support extraction for this file type:

```js
import '@jambonz/ui/public/css/styles.css';
```

###### Available CSS selectors

A more comprehensive table of available selectors here is coming soon. For now the easiest place to visualize this is in the source files for the styles [here](https://github.com/jambonz/next-static-site/tree/main/jambonz-ui/src/styles/).

| CSS selector | Notes | JS component? |
|--------------|-------|---------------|
| `bg--jambonz` | Applies main brand color as element `background-color` | no |
| `bg--black` | Applies color as element `background-color` | no |
| `bg--charcoal` | Applies color as element `background-color` | no |
| `bg--grey` | Applies color as element `background-color` | no |
| `bg--pink` | Applies color as element `background-color` | no |
| `bg--blue` | Applies color as element `background-color` | no |
| `bg--purple` | Applies color as element `background-color` | no |
| `bg--teal` | Applies color as element `background-color` | no |
| `color--jambonz` | Applies main brand color as element `color` | no |
| `color--blue` | Applies color as element `color` | no |
| `color--purple` | Applies color as element `color` | no |
| `color--teal` | Applies color as element `color` | no |


###### Loading in SASS

As mentioned you can import either the whole kit or just the variables and mixins. If you're already using SASS for your jambonz app the recommendation would be to just import the whole thing and not worry about managing another CSS import target anywhere in your frontend stack.

```scss
// This imports the entire SASS lib
@import '@jambonz/ui/src/styles/index.scss';

// This imports just the mixins and variables
@import '@jambonz/ui/src/styles/_vars.scss';
@import '@jambonz/ui/src/styles/_mixins.scss';
```

###### Available SASS variables

A more comprehensive table of available variables here is coming soon. For now the easiest place to visualize this is in the source file for the variables [here](https://github.com/jambonz/next-static-site/tree/main/jambonz-ui/src/styles/_vars.scss).


###### Available SASS mixins

A more comprehensive table of available mixins here is coming soon. For now the easiest place to visualize this is in the source file for the mixins [here](https://github.com/jambonz/next-static-site/tree/main/jambonz-ui/src/styles/_mixins.scss).


<p class="flex">
<a href="/docs/jambonz-ui/icons/">Prev: Icons</a>
<a href="/docs/jambonz-ui/components/">Next: Components</a>
</p>