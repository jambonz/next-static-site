# Styles

Jambonz UI styles are provided a couple of ways. The raw source for the styles is 
[SASS](https://sass-lang.com/) so if you're also using SASS you have the beneficial 
ability to directly use either all the UI SASS or just the variables and mixins for 
use extending the UI kit in your jambonz app. If you use all the SASS you don't need 
to use the raw CSS anywhere in your app. The utilized SASS modules will compile into 
your final CSS output.

##### Loading the CSS

You can load the raw CSS directly into your app with a `<link>` tag if you prefer that 
method. It is provided compiled, minified and minified + gzipped. Assuming you've copied 
the CSS from the `public` directory provided with the package into your own static directory 
and renamed it `jambonz-ui.css`:

```html
<!-- loading the minified CSS -->
<link rel="stylesheet" href="/css/jambonz-ui.css" />
```

You can also import the CSS directly into your jambonz app entry point (JS) as most 
bundlers support extraction for this file type:

```js
import 'jambonz-ui/public/css/styles.css';
```

##### Available CSS selectors

Most of the styles are utilized directly by the [components](/dacs/jambonz-ui/components/) 
so you're better off just using those. These are the basic utility styles that can be used 
in an ad-hoc manor in your jambonz apps.

| CSS selector | Application |
|--------------|-------------|
| `bg--jam` | Applies main brand color as element `background-color` |
| `bg--black` | Applies color as element `background-color` |
| `bg--dark` | Applies color as element `background-color` |
| `bg--grey` | Applies color as element `background-color` |
| `bg--pink` | Applies color as element `background-color` |
| `bg--blue` | Applies color as element `background-color` |
| `bg--purple` | Applies color as element `background-color` |
| `bg--teal` | Applies color as element `background-color` |
| `txt--jam` | Applies main brand color as element `color` |
| `txt--blue` | Applies color as element `color` |
| `txt--purple` | Applies color as element `color` |
| `txt--teal` | Applies color as element `color` |
| `txt--red` | Applies color as element `color` |
| `txt--green` | Applies color as element `color` |
| `txt--grey` | Applies color as element `color` |
| `wrap` | Center contains content with default left/right `padding` |
| `pad` | Applies normalized top/bottom `padding` |
| `pad-b` | Applies normalized bottom `padding` |
| `pad-t` | Applies normalized top `padding` |
| `i` | Inline icon wrapper—normalizes display of `Icon` alongside text |

That `i` class is pretty useful. Here's an example of how it's used on this site to 
inline an icon with some text.

```jsx
<Link href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
  <a className="i" target="_blank">
    <span>design</span>
    <Icons.ExternalLink />
  </a>
</Link>
```


##### Loading in SASS

As mentioned you can use either the whole kit or just the variables and mixins. If you're 
already using SASS for your jambonz app the recommendation would be to just load the whole 


```scss
// This loads the entire SASS lib
// You should use this in your root SASS entry point
@use '@jambonz/ui-kit/src/styles/index';

// In your local SASS modules you can use the vars and mixins from the UI library
@use '@jambonz/ui-kit/styles/vars' as ui-vars;

.some-thing {
  color: ui-vars.$jambonz;
}
```

##### Available SASS variables

A more comprehensive table of available variables here is coming soon. For now the easiest 
place to visualize this is in the source file for the variables 
[here](https://github.com/jambonz/jambonz-ui/tree/main/src/styles/_vars.scss). Every variable 
is also exposed via CSS `:root` for use as [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) 
in other CSS files or for access in JavaScript.


##### Available SASS mixins

A more comprehensive table of available mixins here is coming soon. For now the easiest 
place to visualize this is in the source file for the mixins 
[here](https://github.com/jambonz/jambonz-ui/tree/main/src/styles/_mixins.scss).


<p class="flex">
<a href="/docs/jambonz-ui/icons/">Prev: Icons</a>
<a href="/docs/jambonz-ui/components/">Next: Components</a>
</p>