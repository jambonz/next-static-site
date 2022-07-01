import type { ReactNode, ElementType } from 'react';
import React, { HtmlHTMLAttributes } from 'react';

import type { ClassNameObject } from './utils';

import { classNames } from './utils';

type mainStyles = 'pill' | 'fill';
type subStyles = 'white' | 'dark' | 'teal' | 'blue' | 'purple' | null;

// Just a base for our HTMLElement props...
interface BaseProps extends HtmlHTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface ButtonProps extends BaseProps {
  to?: string | null; // For <Link> from `react-router-dom`
  href?: string | null; // For <Link> from `next/link`
  Link?: ElementType | null; // Provide the <Link> component
  subStyle?: subStyles | 'light' | 'jambonz';
  mainStyle?: mainStyles | 'login';
}

interface ButtonGroupProps extends BaseProps {
  className?: string;
}

interface IconProps extends BaseProps {
  subStyle?: subStyles;
  mainStyle: mainStyles;
}

interface IconGroupProps extends BaseProps {
  className?: string;
  set?: boolean;
}

export function H1({ children, ...rest }: BaseProps) {
  return <h1 {...rest}>{children}</h1>;
}

export function H2({ children, ...rest }: BaseProps) {
  return <h2 {...rest}>{children}</h2>;
}

export function H3({ children, ...rest }: BaseProps) {
  return <h3 {...rest}>{children}</h3>;
}

export function H4({ children, ...rest }: BaseProps) {
  return <h4 {...rest}>{children}</h4>;
}

export function H5({ children, ...rest }: BaseProps) {
  return <h5 {...rest}>{children}</h5>;
}

export function H6({ children, ...rest }: BaseProps) {
  return <h6 {...rest}>{children}</h6>;
}

export function P({ children, ...rest }: BaseProps) {
  return <p {...rest}>{children}</p>;
}

export function M({ children }: BaseProps) {
  return <div className="m">{children}</div>;
}

export function MS({ children }: BaseProps) {
  return <div className="ms">{children}</div>;
}

export function MXS({ children }: BaseProps) {
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

export function Icon({
  children,
  subStyle = null,
  mainStyle = 'fill',
  ...rest
}: IconProps) {
  const classes: ClassNameObject = {
    'icon': true,
    [`icon--${mainStyle}`]: true,
  };

  if (subStyle) {
    classes[`icon--${mainStyle}--${subStyle}`] = true;
  }

  return (
    <div {...rest} className={classNames(classes)}>
      {children}
    </div>
  );
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
