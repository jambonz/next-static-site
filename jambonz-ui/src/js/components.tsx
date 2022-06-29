import type { ReactNode, ElementType } from 'react';
import React from 'react'

import type { IconsMapObject } from './icons';
import type { ClassNameObject } from './utils';

import Icons from './icons';
import { classNames } from './utils';

interface FontProps {
  children: ReactNode,
}

interface ButtonProps {
  to?: string | null; // For <Link> from `react-router-dom`
  href?: string | null; // For <Link> from `next/link`
  Link?: ElementType | null; // Provide the <Link> component
  children: ReactNode;
  subStyle?: string | null;
  mainStyle?: string;
}

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

interface IconProps {
  name: string;
  subStyle?: string | null;
  IconsMap?: IconsMapObject; // Allows overriding with more icons
  mainStyle?: string;
}

interface IconGroupProps {
  children: ReactNode;
  className?: string;
  set: boolean;
}

interface JambonzUIContextObject {
  Link?: ElementType | null;
  Icons?: IconsMapObject;
}

interface JambonzUIProviderProps {
  value: JambonzUIContextObject;
  children: ReactNode;
}

const defaultUIContext: JambonzUIContextObject = { Link: null, Icons };

const JambonzUIContext = React.createContext(defaultUIContext);

export function JambonzUIProvider({ value, children }: JambonzUIProviderProps) {
  return (
    <JambonzUIContext.Provider value={value}>
      {children}
    </JambonzUIContext.Provider>
  );
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
  mainStyle = 'inline',
  ...rest
}: IconProps) {
  const Component = IconsMap[name];
  const classes: ClassNameObject = {
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

export function KitOfParts() {
  const textString = 'jambonz is a self-hosted, “bring your own everything” open source CPaaS platform, developed by the creator of the drachtio open source sip server.';

  return (
    <div className="kit-of-parts">
      {/* Show black background style */}
      <div className="pad bg--black">
        <div className="wrap">
          <div className="wrap-text">
            <H1>H1: {textString}</H1>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H2>H2: {textString}</H2>
        </div>
      </div>
      {/* Show pink background style */}
      <div className="pad bg--pink">
        <div className="wrap">
          <div className="wrap-text">
            <H3>H3: {textString}</H3>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H4>H4: {textString}</H4>
        </div>
      </div>
      {/* Show grey background style */}
      <div className="pad bg--grey">
        <div className="wrap">
          <div className="wrap-text">
            <H5>H5: {textString}</H5>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H6>H6: {textString}</H6>
        </div>
        <div className="wrap-text pad">
          <P>P: {textString}</P>
        </div>
        <div className="wrap-text pad">
          <P>P: With a <strong>strong</strong> element</P>
        </div>
        <div className="wrap-text pad">
          <P>P: With a <strong className="med">medium</strong> element</P>
        </div>
        <div className="wrap-text pad">
          <P>P: With an <em>emphasized</em> element</P>
        </div>
        <div className="wrap-text pad">
          <P>P: <span className="color--blue">With</span> <span className="color--teal">colored</span> <span className="color--purple">text</span></P>
        </div>
        <div className="wrap-text pad">
          <M>M: {textString}</M>
        </div>
        <div className="wrap-text pad">
          <MS>MS: {textString}</MS>
        </div>
        <div className="wrap-text pad">
          <MXS>MXS: {textString}</MXS>
        </div>
        <div className="pad">
          <IconGroup set>
            {Object.keys(Icons).map((icon) => {
              return <Icon key={icon} mainStyle="fill" name={icon} />;
            })}
          </IconGroup>
        </div>
        <div className="pad">
          <IconGroup set>
            <Icon mainStyle="fill" subStyle="dark" name="MapPin" />
            <Icon mainStyle="fill" subStyle="purple" name="MapPin" />
            <Icon mainStyle="fill" subStyle="teal" name="MapPin" />
            <Icon mainStyle="fill" subStyle="blue" name="MapPin" />
          </IconGroup>
        </div>
        <div className="pad">
          <IconGroup set>
            <Icon mainStyle="pill" subStyle="dark" name="Heart" />
            <Icon mainStyle="pill" subStyle="purple" name="Heart" />
            <Icon mainStyle="pill" subStyle="teal" name="Heart" />
            <Icon mainStyle="pill" subStyle="blue" name="Heart" />
            <Icon mainStyle="pill" name="Heart" />
          </IconGroup>
        </div>
        <div className="pad">
          <Button mainStyle="login">Log In</Button>
        </div>
      </div>
      <div className="bg--charcoal">
        <div className="pad">
          <Button mainStyle="login" subStyle="white">Log In</Button>
        </div>
      </div>
      <div className="wrap">
        <ButtonGroup className="pad">
          <Button>Sign up for free</Button>
          <Button subStyle="dark">Get started for free</Button>
        </ButtonGroup>
        <ButtonGroup className="pad">
          <Button subStyle="purple">Do it</Button>
          <Button subStyle="teal">Do it</Button>
          <Button subStyle="blue">Do it</Button>
        </ButtonGroup>
      </div>
      <div className="bg--jambonz">
        <div className="pad">
          <Button subStyle="light">support@jambonz.org</Button>
        </div>
      </div>
      <div className="wrap">
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
        <div className="pad">
          <Button mainStyle="pill" subStyle="jambonz">
            <Icon name="Send" />
            <span>Contact us</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
