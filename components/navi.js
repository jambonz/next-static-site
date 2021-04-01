import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Button, Icon } from './jambonz-ui';
import { homeObj, mobileMedia } from '../lib/vars';

function NaviItem({obj}) {
  const router = useRouter();
  const classes = {
    navi__link: true,
    active: (router.route === obj.link),
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
          <Button href={siteData.navi.login.link} style="login" subStyle="white">{siteData.navi.login.label}</Button>
        </div>
        <div className="navi__mobile__icon" onClick={handler}>
          <Icon style="fill" subStyle="white" name="X" />
        </div>
      </div>
      <ul className="navi__mobile__links">
        <NaviItem key="home" obj={homeObj} />
        {siteData.navi.links.map((obj) => {
          return <NaviItem key={obj.id} obj={obj} />
        })}
      </ul>
      <ul className="navi__mobile__footer">
        {siteData.footer.links.map((obj) => {
          return <NaviItem key={obj.id} obj={obj} />
        })}
      </ul>
      <div className="navi__mobile__support">
        <Button href={`mailto:${siteData.footer.email}`} target="_blank" subStyle="light">{siteData.footer.email}</Button>
      </div>
    </div>
  );
}

export default function Navi({ siteData }) {
  const [active, setActive] = useState(false);
  const [mobile, setMobile] = useState(false);

  const handleNavi = () => {
    setActive(!active);
  };

  const handleMedia = (e) => {
    setMobile(e.matches);
    
    // Make sure mobile navi is closed on resizes...
    if (!e.matches && active) {
      setActive(false);
    }
  };

  useEffect(() => {
    const mql = window.matchMedia(mobileMedia);

    mql.addListener(handleMedia);

    setMobile(mql.matches);

    return function cleanup() {
      mql.removeListener(handleMedia);
    }
  }, [handleMedia, setMobile]);

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
            return <NaviItem key={obj.id} obj={obj} />
          })}
        </ul>
        <div className="navi__icon" onClick={handleNavi}>
          <Icon style="fill" name="Menu" />
        </div>
        <div className="navi__login">
          <Button href={siteData.navi.login.link} style="login">{siteData.navi.login.label}</Button>
        </div>
      </div>
      {mobile && <NaviMobile active={active} handler={handleNavi} siteData={siteData} />}
    </nav>
  );
}