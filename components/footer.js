import { nanoid } from 'nanoid';

import Link from 'next/link';

import { Button } from './jambonz-ui';
import { homeObj } from '../lib/vars';

function FooterItem({ obj }) {
  return (
    <li>
      <Link href={obj.link}>
        <a target={obj.open ? '_blank' : null} className="foot__link">
          {obj.label}
        </a>
      </Link>
    </li>
  );
}

export default function Footer({ siteData }) {
  return (
    <footer className="bg-jambonz foot">
      <div className="wrap foot__wrap">
        <div className="foot__navs">
          <ul className="foot__links">
            {siteData.footer.links.map((obj) => {
              return <FooterItem key={nanoid()} obj={obj} />
            })}
          </ul>
          <ul className="foot__links">
            <FooterItem key="home" obj={homeObj} />
            {siteData.navi.links.map((obj) => {
              return <FooterItem key={nanoid()} obj={obj} />
            })}
          </ul>
        </div>
        <div className="foot__support">
          <Button href={`mailto:${siteData.footer.email}?subject=Jambonz Support`} target="_blank" subStyle="light">
            {siteData.footer.email}
          </Button>
        </div>
      </div>
    </footer>
  );
}