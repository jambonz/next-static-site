# Components

The UI library would not be complete without some atomic components for use in your jambonz apps. Currently there are components for normalized typography, iconography and buttons. As jambonz frontend development continues to mature new use cases will become viable candidates to incorporate into this UI kit—form elements being the most notable upcoming candidates. To see all the components in action, visually in one place you can go [here](/jambonz-ui/).

The component library requires that some JS peer dependencies are met in your jambonz app. The component library itself is also written in [TypeScript](https://www.typescriptlang.org/) so it supports jambonz apps also using TypeScript.

```json
"peerDependencies": {
  "react": ">=17.1.1",
  "react-dom": ">=17.1.1",
  "react-feather": ">=2.0.9"
}
```

###### Using components

You can import available components from the package into your jambonz app JS.

```jsx
import { ButtonGroup, Button, Icon } from '@jambonz/ui';

function MyComponent() {
  return (
    <ButtonGroup className="pad">
      <Button mainStyle="pill">
        <Icon name="GitHub" />
        <span>github.com/jambonz</span>
      </Button>
      <Button mainStyle="pill">
        <Icon name="GitHub" />
        <span>github.com/drachtio</span>
      </Button>
    </ButtonGroup>
  );
}
```

###### Button with Link

The `Button` component takes a few props that are specific to rendering a link element, `<a>`, with button styles. If you just need a button, you can ignore these props. But if you would like links to be styled like buttons (CTAs) and you want them to route within the [React](https://reactjs.org/) context you can do that. The distinction between which one has to do with passing either the `to` or the `href` props that are passed on to the `Link` component in question.

Using the `Link` prop with [react-router-dom](https://reactrouter.com/docs/en/v6/components/link).

```jsx
import { Link } from 'react-router-dom';
import { Button } from '@jambonz/ui';

function MyComponent() {
  return (
    <Button
      Link={Link}
      to="/someurl/"
      subStyle="dark">
        Some text
    </Button>
  );
}
```

Using the `Link` prop with [next/link](https://nextjs.org/docs/api-reference/next/link) for [Next.js](https://nextjs.org/).

```jsx
import Link from 'next/link';
import { Button } from '@jambonz/ui';

function MyComponent() {
  return (
    <Button
      Link={Link}
      href="/someurl/"
      subStyle="dark">
        Some text
    </Button>
  );
}
```

###### Extending the icon set

You can extend the default icon set by importing whatever you would like to use from [react-feather]() and combining that with the default `Icons` exported from the UI library.

```jsx
import { Icons } from '@jambonz/ui';
import { Twitch, YouTube } from 'react-feather';

export const MyIcons = {
  ...Icons,
  Twitch,
  YouTube,
};
```

You can then pass an optional `IconsMap` prop along to the `Icon` component when you would like to use your new icons.

```jsx
import { MyIcons } from './my-icons';
import { Icon } from '@jambonz/ui';

function MyComponent() {
  return (
    <Icon
      IconsMap={MyIcons}
      mainStyle="pill"
      subStyle="dark"
      name="Twitch"
    />
  );
}
```

###### Atomic components

| Component | Props |
|-----------|-------|
| Icon | `{ name, subStyle, mainStyle, IconsMap, ...rest }` |
| IconGroup | `{ children, className, set }` |
| Button | `{ to, href, Link, children, subStyle, mainStyle, ...rest }` |
| ButtonGroup | `{ children, className }` |

###### Typography components

| Component | Props |
|-----------|-------|
| H1 | `{ children, ...rest }` |
| H2 | `{ children, ...rest }` |
| H3 | `{ children, ...rest }` |
| H4 | `{ children, ...rest }` |
| H5 | `{ children, ...rest }` |
| H6 | `{ children, ...rest }` |
| P | `{ children, ...rest }` |
| M | `{ children }` |
| MS | `{ children }` |
| MXS | `{ children }` |

<p class="flex">
<a href="/docs/jambonz-ui/styles/">Prev: Styles</a>
<span>&nbsp;</span>
</p>