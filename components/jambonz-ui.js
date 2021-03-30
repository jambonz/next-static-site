import Link from 'next/link';
import Head from 'next/head';
import classNames from 'classnames';
import * as Icons from 'react-feather';

export function H1({ children }) {
  return <div className="h1">{children}</div>;
}

export function H2({ children }) {
  return <div className="h2">{children}</div>;
}

export function H3({ children }) {
  return <div className="h3">{children}</div>;
}

export function H4({ children }) {
  return <div className="h4">{children}</div>;
}

export function H5({ children }) {
  return <div className="h5">{children}</div>;
}

export function H6({ children }) {
  return <div className="h6">{children}</div>;
}

export function P({children}) {
  return <div className="p">{children}</div>;
}

export function M({ children }) {
  return <div className="m">{children}</div>;
}

export function MS({ children }) {
  return <div className="ms">{children}</div>;
}

export function MXS({ children }) {
  return <div className="mxs">{children}</div>;
}

export function Button({children, href, style = 'jambonz', target = '_blank'}) {
  const classes = {
    'btn': true,
    [`btn--${style}`]: true,
  };

  return (
    <Link href={href}>
      <a target={target} className={classNames(classes)}>{children}</a>
    </Link>
  );
}

export function Icon({name, size = 24, style = 'inline'}) {
  const Component = Icons[name];
  const classes = {
    'icon': true,
    [`icon--${style}`]: true,
  };

  // See react-feather for all 286 icons available
  // https://github.com/feathericons/react-feather
  if (!Component) {
    return null;
  }

  // Circle icon with fill or pill style
  if (style !== 'inline') {
    return (
      <div className={classNames(classes)}>
        <Component size={size} />
      </div>
    );
  }

  // Inline SVG icon
  return <Component size={size} />;
}

export function Layout({children, title = "jambonz"}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="The “bring your own everything” CPaaS"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        {/*
          manifest.json provides metadata used when your web app is installed on a
          user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {children}
    </>
  );
}