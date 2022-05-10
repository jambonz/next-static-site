import Link from 'next/link';

import Layout from '../src/components/layout';
import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Button, Icon } from '../src/components/jambonz-ui';
import { getData } from '../src/lib/data';

export default function JambonzUI({ data }) {
  const pageData = data['jambonz-ui'];

  return (
    <Layout siteData={data.site}>
      <div className="jambonz-ui">
        {/* High-level design information */}
        <div className="hero pad">
          <div className="wrap">
            <H1>
              <div>Jambonz UI</div>
              <div>&nbsp;</div>
            </H1>
            <H5>
              <div><strong>font</strong></div>
              <div>Objectivity (free, large family—16 styles)</div>
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
              <div>Feather (free, large set—286 icons)</div>
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
            </H5>
          </div>
        </div>
        {/* Show black background style */}
        <div className="pad bg-black">
          <div className="wrap">
            <div className="wrap-text">
              <H1>{pageData.text}</H1>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H2>{pageData.text}</H2>
          </div>
        </div>
        {/* Show pink background style */}
        <div className="pad bg-pink">
          <div className="wrap">
            <div className="wrap-text">
              <H3>{pageData.text}</H3>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H4>{pageData.text}</H4>
          </div>
        </div>
        {/* Show grey background style */}
        <div className="pad bg-grey">
          <div className="wrap">
            <div className="wrap-text">
              <H5>{pageData.text}</H5>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H6>{pageData.text}</H6>
          </div>
          <div className="wrap-text pad">
            <P>{pageData.text}</P>
          </div>
          <div className="wrap-text pad">
            <M>{pageData.text}</M>
          </div>
          <div className="wrap-text pad">
            <MS>{pageData.text}</MS>
          </div>
          <div className="wrap-text pad">
            <MXS>{pageData.text}</MXS>
          </div>
          <div className="pad">
            <img src="/images/Jambonz_app_screenshot.png" />
          </div>
          <div className="pad">
            <div className="icons">
              <Icon mainStyle="fill" name="Server" />
              <Icon mainStyle="fill" name="Folder" />
              <Icon mainStyle="fill" name="Cloud" />
              <Icon mainStyle="fill" name="Layers" />
              <Icon mainStyle="fill" name="UserCheck" />
              <Icon mainStyle="fill" name="Lock" />
              <Icon mainStyle="fill" name="ThumbsUp" />
              <Icon mainStyle="fill" subStyle="purple" name="Phone" />
              <Icon mainStyle="fill" subStyle="teal" name="PhoneCall" />
              <Icon mainStyle="fill" subStyle="blue" name="Activity" />
              <Icon mainStyle="pill" name="Heart" />
            </div>
          </div>
          <div className="pad">
            <img src="/svg/drachtio.svg" width="128" />
          </div>
          <div className="pad">
            <Button href="#" mainStyle="login">Log In</Button>
          </div>
          <div className="btns pad">
            <Button href="#">Button</Button>
            <Button href="#" subStyle="dark">styles...</Button>
          </div>
          <div className="btns pad">
            <Button href="#" subStyle="purple">Optional</Button>
            <Button href="#" subStyle="teal">button</Button>
            <Button href="#" subStyle="blue">styles...</Button>
          </div>
          <div className="btns pad">
            <Button href="https://github.com/jambonz" target="_blank" mainStyle="pill">
              <Icon name="GitHub" />
              <span>github.com/jambonz</span>
            </Button>
            <Button href="https://github.com/drachtio" target="_blank" mainStyle="pill">
              <Icon name="GitHub" />
              <span>github.com/drachtio</span>
            </Button>
          </div>
          <div className="pad">
            <Button href="#" mainStyle="pill" subStyle="jambonz">
              <Icon name="Send" />
              <span>Contact us to get started</span>
            </Button>
          </div>
        </div>
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
