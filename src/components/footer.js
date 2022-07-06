import Link from 'next/link';

import { nanoid } from 'nanoid';
import { Button, classNames } from 'jambonz-ui';

import { rSlash } from './utils';
import { useActiveNavi } from './hooks';

function FooterItem({ obj }) {
  const activeNavi = useActiveNavi();
  const cleanLink = obj.link.replace(rSlash, '');
  const classes = {
    foot__link: true,
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

export default function Footer({ siteData }) {
  return (
    <footer className="bg--dark foot">
      <div className="wrap foot__wrap">
        <div className="foot__navs">
          <ul className="foot__links">
            {siteData.footer.links.map((obj) => {
              return <FooterItem key={nanoid()} obj={obj} />;
            })}
          </ul>
          <ul className="foot__links">
            <FooterItem key="home" obj={siteData.navi.home} />
            {siteData.navi.links.map((obj) => {
              return <FooterItem key={nanoid()} obj={obj} />;
            })}
          </ul>
        </div>
        <div className="foot__support">
          <Button as={Link} href={`mailto:${siteData.footer.email}?subject=Jambonz Support`} target="_blank" subStyle="white">
            {siteData.footer.email}
          </Button>
        </div>
      </div>
    </footer>
  );
}