import Link from 'next/link';
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

export function Hero({ children }) {
  return <div className="hero wrap">{children}</div>;
}

// Extra {props} get passed to the <a> element
export function Button({ children, href, style = 'fill', subStyle = null, ...props }) {
  const classes = {
    'btn': true,
    [`btn--${style}`]: true,
  };

  if (subStyle) {
    classes[`btn--${style}--${subStyle}`] = true;
  }

  return (
    <Link href={href}>
      <a {...props} className={classNames(classes)}>{children}</a>
    </Link>
  );
}

// Extra {props} get passed to the feather Component
// See react-feather for all 286 icons available
// https://github.com/feathericons/react-feather
export function Icon({ name, style = 'inline', subStyle = null, ...props }) {
  const Component = Icons[name];
  const classes = {
    'icon': true,
    [`icon--${style}`]: true,
  };

  if (subStyle) {
    classes[`icon--${style}--${subStyle}`] = true;
  }

  if (!Component) {
    return null;
  }

  // Stylized icon
  if (style !== 'inline') {
    return (
      <div className={classNames(classes)}>
        <Component {...props} />
      </div>
    );
  }

  // Inline icon
  return <Component {...props} />;
}