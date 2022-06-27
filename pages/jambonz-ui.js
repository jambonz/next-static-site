import Link from 'next/link';

import { H1, H2, Icon, KitOfParts } from '@jambonz/ui';

import { getData } from '../src/lib/data';
import Layout, { Hero } from '../src/components/layout';

export default function JambonzUI({ data }) {
  return (
    <Layout siteData={data.site}>
      <div className="jambonz-ui">
        {/* High-level design information */}
        <Hero subStyle="jambonz-ui" altStyle="pink">
          <div className="wrap">
            <H1>
              <div>Jambonz UI</div>
              <div>&nbsp;</div>
            </H1>
            <H2 className="h5">
              <div><strong>font</strong></div>
              <div>Objectivity (os, large family—16 styles)</div>
              <div>
                <Link href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
                  <a className="i" target="_blank">
                    <span>design</span>
                    <Icon name="ExternalLink" />
                  </a>
                </Link>
              </div>
              <div>
                <Link href="https://www.fontsquirrel.com/fonts/objectivity">
                  <a className="i" target="_blank">
                    <span>specimen</span>
                    <Icon name="ExternalLink" />
                  </a>
                </Link>
              </div>
              <div>&nbsp;</div>
              <div><strong>icons</strong></div>
              <div>Feather (os, large set—286 icons)</div>
              <div>
                <Link href="https://feathericons.com">
                  <a className="i" target="_blank">
                    <span>specimen</span>
                    <Icon name="ExternalLink" />
                  </a>
                </Link>
              </div>
              <div>
                <Link href="https://github.com/feathericons/react-feather">
                  <a className="i" target="_blank">
                    <span>react-feather</span>
                    <Icon name="ExternalLink" />
                  </a>
                </Link>
              </div>
            </H2>
          </div>
        </Hero>
        <KitOfParts />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('jambonz-ui');

  return {
    props: {
      data,
    },
  };
}
