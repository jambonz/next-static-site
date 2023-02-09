import Link from 'next/link';

import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Button, Icon, classNames } from '@jambonz/ui-kit';

import { Icons } from './icons';
import { rSlash } from './utils';
import { useMobileMedia, useActiveNavi } from './hooks';

function NaviItem({obj}) {
  const activeNavi = useActiveNavi();
  const cleanLink = obj.link.replace(rSlash, '');
  const classes = {
    navi__link: true,
    active: cleanLink === activeNavi,
  };

  return (
    <li>
      <Link href={obj.link}>
        <a target={obj.open ? '_blank' : null} className={classNames(classes)}>
          {obj.label}
        </a>
      </Link>
    </li>
  );
}

function NaviMobile({ active, handler, siteData }) {
  const classes = {
    'bg--dark': true,
    'wrap': true,
    'navi__mobile': true,
    'active': active,
  };

  return (
    <div className={classNames(classes)}>
      <div className="navi__mobile__head">
        <div className="navi__mobile__login">
          <Button as={Link} href={siteData.navi.login.link} mainStyle="hollow" subStyle="white" onClick={handler} small>
            {siteData.navi.login.label}
          </Button>
        </div>
        <div className="navi__mobile__icon" onClick={handler}>
          <Icon subStyle="white">
            <Icons.X />
          </Icon>
        </div>
      </div>
      <ul className="navi__mobile__links">
        <NaviItem key="home" obj={siteData.navi.home} />
        {siteData.navi.links.map((obj) => {
          return <NaviItem key={nanoid()} obj={obj} />;
        })}
      </ul>
      <ul className="navi__mobile__footer">
        {siteData.footer.links.map((obj) => {
          return <NaviItem key={nanoid()} obj={obj} />;
        })}
      </ul>
      <div className="navi__mobile__support">
        <Button as={Link} href={`mailto:${siteData.footer.email}`} target="_blank" subStyle="white">
          {siteData.footer.email}
        </Button>
      </div>
    </div>
  );
}

export default function Navi({ siteData }) {
  const [active, setActive] = useState(false);
  const mobile = useMobileMedia();
  const classes = {
    navi: true,
    mobile,
    active,
  };

  const handleNavi = () => {
    setActive(!active);
  };

  // Make sure mobile navi is closed on resizes...
  if (!mobile && active) {
    setActive(false);
  }

  return (
    <nav className={classNames(classes)}>
      <div className="wrap navi__wrap">
        <Link href="/">
          <a className="navi__logo" title="jambonz">
            <img src="/svg/jambonz.svg" width="128" height="42" alt="jambonz" />
          </a>
        </Link>
        <ul className="navi__links">
          {siteData.navi.links.map((obj) => {
            return <NaviItem key={nanoid()} obj={obj} />;
          })}
        </ul>
        <div className="navi__icon" onClick={handleNavi}>
          <Icon>
            <Icons.Menu />
          </Icon>
        </div>
        <div className="navi__login">
          <Button as={Link} href={siteData.navi.login.link} mainStyle="hollow" small>
            {siteData.navi.login.label}
          </Button>
        </div>
      </div>
      {mobile && <NaviMobile active={active} handler={handleNavi} siteData={siteData} />}
    </nav>
  );
}