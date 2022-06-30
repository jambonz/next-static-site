import Link from 'next/link';

import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Icon, Button, IconGroup, ButtonGroup } from '@jambonz/ui';

import { getData } from '../src/lib/data';
import { Icons } from '../src/components/icons';
import Layout, { Hero } from '../src/components/layout';

export default function JambonzUI({ data }) {
  return (
    <Layout siteData={data.site}>
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
                  <Icons.ExternalLink />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://www.fontsquirrel.com/fonts/objectivity">
                <a className="i" target="_blank">
                  <span>specimen</span>
                  <Icons.ExternalLink />
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
                  <Icons.ExternalLink />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://github.com/feathericons/react-feather">
                <a className="i" target="_blank">
                  <span>react-feather</span>
                  <Icons.ExternalLink />
                </a>
              </Link>
            </div>
          </H2>
        </div>
      </Hero>
      <div className="kit-of-parts">
        <div className="pad bg--black">
          <div className="wrap">
            <div className="wrap-text">
              <H1>H1: {data['jambonz-ui'].text}</H1>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H2>H2: {data['jambonz-ui'].text}</H2>
          </div>
        </div>
        <div className="pad bg--pink">
          <div className="wrap">
            <div className="wrap-text">
              <H3>H3: {data['jambonz-ui'].text}</H3>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H4>H4: {data['jambonz-ui'].text}</H4>
          </div>
        </div>
        <div className="pad bg--grey">
          <div className="wrap">
            <div className="wrap-text">
              <H5>H5: {data['jambonz-ui'].text}</H5>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H6>H6: {data['jambonz-ui'].text}</H6>
          </div>
          <div className="wrap-text pad">
            <P>P: {data['jambonz-ui'].text}</P>
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
            <M>M: {data['jambonz-ui'].text}</M>
          </div>
          <div className="wrap-text pad">
            <MS>MS: {data['jambonz-ui'].text}</MS>
          </div>
          <div className="wrap-text pad">
            <MXS>MXS: {data['jambonz-ui'].text}</MXS>
          </div>
        </div>
        <div className="wrap">
          <div className="pad">
            <IconGroup set>
              {Object.keys(Icons).map((icon) => {
                const SvgIcon = Icons[icon];
                return (
                  <Icon key={icon} mainStyle="fill">
                    <SvgIcon />
                  </Icon>
                );
              })}
            </IconGroup>
          </div>
          <div className="pad">
            <IconGroup set>
              <Icon mainStyle="fill" subStyle="dark">
                <Icons.MapPin />
              </Icon>
              <Icon mainStyle="fill" subStyle="purple">
                <Icons.MapPin />
              </Icon>
              <Icon mainStyle="fill" subStyle="teal">
                <Icons.MapPin />
              </Icon>
              <Icon mainStyle="fill" subStyle="blue">
                <Icons.MapPin />
              </Icon>
            </IconGroup>
          </div>
          <div className="pad">
            <IconGroup set>
              <Icon mainStyle="pill" subStyle="dark">
                <Icons.Heart />
              </Icon>
              <Icon mainStyle="pill" subStyle="purple">
                <Icons.Heart />
              </Icon>
              <Icon mainStyle="pill" subStyle="teal">
                <Icons.Heart />
              </Icon>
              <Icon mainStyle="pill" subStyle="blue">
                <Icons.Heart />
              </Icon>
              <Icon mainStyle="pill">
                <Icons.Heart />
              </Icon>
            </IconGroup>
          </div>
          <div className="pad">
            <Button mainStyle="login">Log In</Button>
          </div>
        </div>
        <div className="bg--charcoal">
          <div className="pad">
            <Icon mainStyle="pill" subStyle="white">
              <Icons.Heart />
            </Icon>
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
              <Icons.GitHub />
              <span>github.com/jambonz</span>
            </Button>
            <Button mainStyle="pill">
              <Icons.GitHub />
              <span>github.com/drachtio</span>
            </Button>
          </ButtonGroup>
          <div className="pad">
            <Button mainStyle="pill" subStyle="jambonz">
              <Icons.Send />
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
