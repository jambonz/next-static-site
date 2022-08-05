# Components

The UI library would not be complete without some atomic components for use in your jambonz apps. 
Currently there are components for normalized typography, iconography and buttons. As jambonz frontend 
development continues to mature new use cases will become viable candidates to incorporate into this 
UI kit—form elements being the most notable upcoming candidates. To see all the components in action, 
visually in one place you can go [here](/jambonz-ui/).

The component library is written in [TypeScript](https://www.typescriptlang.org/) so it supports 
jambonz apps also using TypeScript. Documentation on jambonz UI type definitions will be implemented 
as we go.

The component library requires that some JS peer dependencies are met in your jambonz app. These are 
likely the most common, however it's worth noting that you can also use the library with [preact](https://preactjs.com/). 
In fact, this site is a `Next.js` app using `preact/compat` in place of the `React` packages.

```json
"peerDependencies": {
  "react": ">=17.0.2",
  "react-dom": ">=17.0.2",
  "react-feather": ">=2.0.9"
}
```

###### Button

| Props | Value(s) |
|-------|----------|
| children | Will render any children |
| mainStyle | Currenly the only valid value is `hollow` |
| subStyle | Valid values are `dark`, `blue`, `teal`, `purple`, `white` |
| as | Render as either `next/link` or `react-router-dom` link |
| to | Use with `react-router-dom` link |
| href | Use with `next/link` |
| ...rest | Props are spread so you can pass extra attributes like `type="submit` for buttons |

###### ButtonGroup

| Props | Value(s) |
|-------|----------|
| children | Will render any children -- should be `<Button>`s |
| className | Any valid `className` string |

###### Icon

| Props | Value(s) |
|-------|----------|
| children | Will render any children |
| mainStyle | Currenly the only valid value is `hollow` |
| subStyle | Valid values are `dark`, `blue`, `teal`, `purple`, `white` |
| ...rest | Props are spread so you can pass extra attributes like `type="submit` for buttons |

###### IconGroup

| Props | Value(s) |
|-------|----------|
| children | Will render any children -- should be `<Icon>`s |
| className | Any valid `className` string |
| set | Boolean, will add `ico--set` className if present |

###### Typography H[1-6], P, M, MS and MXS

All of these accept the same type of props with the exception of `M`, `MS` and `MXS` not spreading `rest` props.

| Props | Value(s) |
|-------|----------|
| children | Will render any children |
| ...rest | Props are spread so you can pass extra attributes like `className`. Note that `M`, `MS` and `MXS` don't support this. |

##### Using components

You can import available components from the package into your jambonz app JS.

```jsx
import { ButtonGroup, Button, Icon } from 'jambonz-ui';

function MyComponent() {
  return (
    <ButtonGroup className="pad">
      <Button mainStyle="pill">
        <Icons.GitHub />
        <span>github.com/jambonz</span>
      </Button>
      <Button mainStyle="pill">
        <Icons.GitHub />
        <span>github.com/drachtio</span>
      </Button>
    </ButtonGroup>
  );
}
```

##### Notes on Button as Link (polymorphic)

The `Button` component takes a few props that are specific to rendering a link element, `<a>`, 
with button styles. If you just need a button, you can ignore these props. But if you would like 
links to be styled like buttons (CTAs) and you want them to route within the [React](https://reactjs.org/) 
context you can do that. The distinction between which one has to do with passing either the `to` or 
the `href` props that are passed on to the `Link` component in question.

Using the `Link` prop with [react-router-dom](https://reactrouter.com/docs/en/v6/components/link).

```jsx
import { Link } from 'react-router-dom';
import { Button } from 'jambonz-ui';

function MyComponent() {
  return (
    <Button
      as={Link}
      to="/someurl/"
      subStyle="dark"
    >
      Some text
    </Button>
  );
}
```

Using the `Link` prop with [next/link](https://nextjs.org/docs/api-reference/next/link) for [Next.js](https://nextjs.org/).

```jsx
import Link from 'next/link';
import { Button } from 'jambonz-ui';

function MyComponent() {
  return (
    <Button
      as={Link}
      href="/someurl/"
      subStyle="dark"
    >
      Some text
    </Button>
  );
}
```

##### Importing your icon set

By default the UI library doesn't import any icons from [feathericons](https://feathericons.com/), 
however it declares [react-feather](https://github.com/feathericons/react-feather) as a peer dependency. 
This means you can import just the icons you are using in your jambonz app. This allows for 
[tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) to take effect and ensures 
we don't load extra bloat into our dist JS that isn't explicitly used. The `Icon` component renders a 
stylized design icon with many visual variations.

You can see how we import the feather icons used on this site 
[here](https://github.com/jambonz/next-static-site/blob/main/src/components/icons.js). 
But for a quick reference here is a compressed example.

First we create a module in our jambonz app and import the icons we would 
like to use and export them for use in the rest of the app.

```jsx
import {
  X,
  Lock,
  Send,
  Menu,
  Phone,
  Heart,
  ExternalLink,
  // ...
} from 'react-feather';

export const Icons = {
  X,
  Lock,
  Send,
  Menu,
  Phone,
  Heart,
  ExternalLink,
  // ...
};

export default Icons;
```

Then we can use these icons both `inline` and with the `Icon` component for stylized designer icons.

```jsx
import { Icons } from './my-icons';
import { Icon } from 'jambonz-ui';

function MyComponent() {
  return (
    <>
      <Icon mainStyle="pill" subStyle="dark">
        <Icons.Heart />
      </Icon>
      <Link href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
        <a className="i" target="_blank">
          <span>design</span>
          <Icons.ExternalLink />
        </a>
      </Link>
    </>
  );
}
```

<p class="flex">
<a href="/docs/jambonz-ui/styles/">Prev: Styles</a>
<span>&nbsp;</span>
</p>