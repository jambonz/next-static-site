import React from 'react';

import Icons from './icons';
import { classNames } from './utils';

export function H1({ children, ...rest }) {
  return <h1 {...rest}>{children}</h1>;
}

export function H2({ children, ...rest }) {
  return <h2 {...rest}>{children}</h2>;
}

export function H3({ children, ...rest }) {
  return <h3 {...rest}>{children}</h3>;
}

export function H4({ children, ...rest }) {
  return <h4 {...rest}>{children}</h4>;
}

export function H5({ children, ...rest }) {
  return <h5 {...rest}>{children}</h5>;
}

export function H6({ children, ...rest }) {
  return <h6 {...rest}>{children}</h6>;
}

export function P({ children, ...rest }) {
  return <p {...rest}>{children}</p>;
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

export function Button({
  to = null, // For <Link> from `react-router-dom`
  href = null, // For <Link> from `next/link`
  Link = null, // Provide the <Link> component -- for now...
  children,
  subStyle = null,
  mainStyle = 'fill',
  ...rest
}) {
  const classes = {
    'btn': true,
    [`btn--${mainStyle}`]: true,
  };

  if (subStyle) {
    classes[`btn--${mainStyle}--${subStyle}`] = true;
  }

  // For <Link> from `react-router-dom`
  if (to && Link) {
    return (
      <Link {...rest} to={to} className={classNames(classes)}>
        {children}
      </Link>
    );
  }
  
  // For <Link> from `next/link`
  if (href && Link) {
    return (
      <Link href={href}>
        <a {...rest} className={classNames(classes)}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button {...rest} className={classNames(classes)}>
      {children}
    </button>
  );
}

// Simple grouping of multiple <Button>'s
export function ButtonGroup({ children, className = '' }) {
  const classes = {
    'btns': true,
  };

  className.split(' ').forEach(c => classes[c] = true);

  return (
    <div className={classNames(classes)}>
      {children}
    </div>
  );
}

// Extra {props} get passed to the feather Component
// See react-feather for all 286 icons available
// https://github.com/feathericons/react-feather
export function Icon({
  name = null,
  subStyle = null,
  mainStyle = 'inline',
  ...rest
}) {
  const Component = Icons[name];
  const classes = {
    'icon': true,
    [`icon--${mainStyle}`]: true,
  };

  if (subStyle) {
    classes[`icon--${mainStyle}--${subStyle}`] = true;
  }

  if (!Component) {
    return null;
  }

  // Stylized icon
  if (mainStyle !== 'inline') {
    return (
      <div className={classNames(classes)}>
        <Component {...rest} />
      </div>
    );
  }

  // Inline icon
  return <Component {...rest} />;
}

// Simple grouping of multiple <Icon>'s
export function IconGroup({
  set = false,
  children,
  className = ''
}) {
  const classes = {
    'icons': true,
    'icons--set': set,
  };

  className.split(' ').forEach(c => classes[c] = true);

  return (
    <div className={classNames(classes)}>
      {children}
    </div>
  );
}
