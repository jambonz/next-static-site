import type { ReactNode, ElementType } from 'react';
import type { Icon as IconType } from 'react-feather';
import React from 'react'

import type { IconsMapObject } from './icons';
import type { ClassNameObject } from './utils';

import Icons from './icons';
import { classNames } from './utils';

type mainStyles = 'pill' | 'fill';
type subStyles = 'white' | 'dark' | 'teal' | 'blue' | 'purple' | null;

interface FontProps {
  children: ReactNode,
}

interface ButtonProps {
  to?: string | null; // For <Link> from `react-router-dom`
  href?: string | null; // For <Link> from `next/link`
  Link?: ElementType | null; // Provide the <Link> component
  children: ReactNode;
  subStyle?: subStyles | 'light' | 'jambonz';
  mainStyle?: mainStyles | 'login';
}

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

interface IconProps {
  name: string;
  IconsMap?: IconsMapObject; // Allows overriding with more icons
  subStyle?: subStyles;
  mainStyle?: mainStyles | null;
}

interface IconGroupProps {
  children: ReactNode;
  className?: string;
  set?: boolean;
}

export function H1({ children, ...rest }: FontProps) {
  return <h1 {...rest}>{children}</h1>;
}

export function H2({ children, ...rest }: FontProps) {
  return <h2 {...rest}>{children}</h2>;
}

export function H3({ children, ...rest }: FontProps) {
  return <h3 {...rest}>{children}</h3>;
}

export function H4({ children, ...rest }: FontProps) {
  return <h4 {...rest}>{children}</h4>;
}

export function H5({ children, ...rest }: FontProps) {
  return <h5 {...rest}>{children}</h5>;
}

export function H6({ children, ...rest }: FontProps) {
  return <h6 {...rest}>{children}</h6>;
}

export function P({ children, ...rest }: FontProps) {
  return <p {...rest}>{children}</p>;
}

export function M({ children }: FontProps) {
  return <div className="m">{children}</div>;
}

export function MS({ children }: FontProps) {
  return <div className="ms">{children}</div>;
}

export function MXS({ children }: FontProps) {
  return <div className="mxs">{children}</div>;
}

export function Button({
  to = null,
  href = null,
  Link = null,
  children,
  subStyle = null,
  mainStyle = 'fill',
  ...rest
}: ButtonProps) {
  const classes: ClassNameObject = {
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
export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  const classes: ClassNameObject = {
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
  name,
  subStyle = null,
  IconsMap = Icons,
  mainStyle = null,
  ...rest
}: IconProps) {
  const Component: IconType = IconsMap[name];
  const classes: ClassNameObject = {
    'icon': true,
    [`icon--${mainStyle}`]: true,
  };

  if (!Component) {
    return null;
  }

  // Stylized icon
  if (mainStyle) {
    if (subStyle) {
      classes[`icon--${mainStyle}--${subStyle}`] = true;
    }

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
}: IconGroupProps) {
  const classes: ClassNameObject = {
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
