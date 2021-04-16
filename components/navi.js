import { useState } from 'react';
import { nanoid } from 'nanoid';
import classNames from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Icon, useMobileMedia } from './jambonz-ui';

function NaviItem({obj}) {
  const router = useRouter();
  const regex = new RegExp(`^${obj.link}`);
  const classes = {
    navi__link: true,
    active: regex.test(router.asPath),
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
    'bg-jambonz': true,
    'wrap': true,
    'navi__mobile': true,
    'active': active,
  };

  return (
    <div className={classNames(classes)}>
      <div className="navi__mobile__head">
        <div className="navi__mobile__login">
          <Button href={siteData.navi.login.link} target="_blank" style="login" subStyle="white">
            {siteData.navi.login.label}
          </Button>
        </div>
        <div className="navi__mobile__icon" onClick={handler}>
          <Icon style="fill" subStyle="white" name="X" />
        </div>
      </div>
      <ul className="navi__mobile__links">
        <NaviItem key="home" obj={siteData.navi.home} />
        {siteData.navi.links.map((obj) => {
          return <NaviItem key={nanoid()} obj={obj} />
        })}
      </ul>
      <ul className="navi__mobile__footer">
        {siteData.footer.links.map((obj) => {
          return <NaviItem key={nanoid()} obj={obj} />
        })}
      </ul>
      <div className="navi__mobile__support">
        <Button href={`mailto:${siteData.footer.email}`} target="_blank" subStyle="light">
          {siteData.footer.email}
        </Button>
      </div>
    </div>
  );
}

export default function Navi({ siteData }) {
  const [active, setActive] = useState(false);
  const mobile = useMobileMedia();

  const handleNavi = () => {
    setActive(!active);
  };

  // Make sure mobile navi is closed on resizes...
  if (!mobile && active) {
    setActive(false);
  }

  return (
    <nav className="navi">
      <div className="wrap navi__wrap">
        <Link href="/">
          <a className="navi__logo">
            <img src="/svg/jambonz.svg" width="128" />
          </a>
        </Link>
        <ul className="navi__links">
          {siteData.navi.links.map((obj) => {
            return <NaviItem key={nanoid()} obj={obj} />
          })}
        </ul>
        <div className="navi__icon" onClick={handleNavi}>
          <Icon style="fill" name="Menu" />
        </div>
        <div className="navi__login">
          <Button href={siteData.navi.login.link} target="_blank" style="login">
            {siteData.navi.login.label}
          </Button>
        </div>
      </div>
      {mobile && <NaviMobile active={active} handler={handleNavi} siteData={siteData} />}
    </nav>
  );
}