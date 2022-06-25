import Link from 'next/link';

import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Button, Icon, Icons, ButtonGroup, IconGroup } from '@jambonz/ui';

import { getData } from '../src/lib/data';
import Layout, { Hero } from '../src/components/layout';

export default function JambonzUI({ data }) {
  const pageData = data['jambonz-ui'];

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
        {/* Show black background style */}
        <div className="pad bg--black">
          <div className="wrap">
            <div className="wrap-text">
              <H1>H1: {pageData.text}</H1>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H2>H2: {pageData.text}</H2>
          </div>
        </div>
        {/* Show pink background style */}
        <div className="pad bg--pink">
          <div className="wrap">
            <div className="wrap-text">
              <H3>H3: {pageData.text}</H3>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H4>H4: {pageData.text}</H4>
          </div>
        </div>
        {/* Show grey background style */}
        <div className="pad bg--grey">
          <div className="wrap">
            <div className="wrap-text">
              <H5>H5: {pageData.text}</H5>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H6>H6: {pageData.text}</H6>
          </div>
          <div className="wrap-text pad">
            <P>P: {pageData.text}</P>
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
            <M>M: {pageData.text}</M>
          </div>
          <div className="wrap-text pad">
            <MS>MS: {pageData.text}</MS>
          </div>
          <div className="wrap-text pad">
            <MXS>MXS: {pageData.text}</MXS>
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
            <Button Link={Link} href="/regions/?redirect=login" mainStyle="login">Log In</Button>
          </div>
        </div>
        <div className="bg--charcoal">
          <div className="pad">
            <Button Link={Link} href="/regions/?redirect=login" mainStyle="login" subStyle="white">Log In</Button>
          </div>
        </div>
        <div className="wrap">
          <ButtonGroup className="pad">
            <Button Link={Link} href="/regions/?redirect=register">Sign up for free</Button>
            <Button Link={Link} href="/regions/?redirect=register" subStyle="dark">Get started for free</Button>
          </ButtonGroup>
          <ButtonGroup className="pad">
            <Button subStyle="purple">Do it</Button>
            <Button subStyle="teal">Do it</Button>
            <Button subStyle="blue">Do it</Button>
          </ButtonGroup>
        </div>
        <div className="bg--jambonz">
          <div className="pad">
            <Button Link={Link} href="mailto:support@jambonz.org?subject=Jambonz Support" subStyle="light" target="_blank">support@jambonz.org</Button>
          </div>
        </div>
        <div className="wrap">
          <ButtonGroup className="pad">
            <Button Link={Link} href="https://github.com/jambonz" target="_blank" mainStyle="pill">
              <Icon name="GitHub" />
              <span>github.com/jambonz</span>
            </Button>
            <Button Link={Link} href="https://github.com/drachtio" target="_blank" mainStyle="pill">
              <Icon name="GitHub" />
              <span>github.com/drachtio</span>
            </Button>
          </ButtonGroup>
          <div className="pad">
            <Button Link={Link} href="mailto:support@jambonz.org?subject=Additional Services Support" mainStyle="pill" subStyle="jambonz" target="_blank">
              <Icon name="Send" />
              <span>Contact us</span>
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
