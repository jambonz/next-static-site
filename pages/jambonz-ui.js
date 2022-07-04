import Link from 'next/link';

import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Icon, Button, IconGroup, ButtonGroup } from 'jambonz-ui';

import { getData } from '../src/lib/data';
import { Icons } from '../src/components/icons';
import Layout, { Hero } from '../src/components/layout';

function KitOfParts({ textString }) {
  return (
    <div className="kop" style={{ textAlign: 'center' }}>
      {/** Typography */}
      <div className="kop__typography">
        <div className="pad bg--black">
          <div className="wrap">
            <div className="wrap-text">
              <H1 style={{ maxWidth: '1024px' }}>H1: {textString}</H1>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H2 style={{ maxWidth: '850px' }}>H2: {textString}</H2>
          </div>
        </div>
        <div className="pad bg--pink">
          <div className="wrap">
            <div className="wrap-text">
              <H3 style={{ maxWidth: '760px' }}>H3: {textString}</H3>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H4 style={{ maxWidth: '760px' }}>H4: {textString}</H4>
          </div>
        </div>
        <div className="pad bg--grey">
          <div className="wrap">
            <div className="wrap-text">
              <H5 style={{ maxWidth: '660px' }}>H5: {textString}</H5>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wrap-text pad">
            <H6 style={{ maxWidth: '620px' }}>H6: {textString}</H6>
          </div>
          <div className="wrap-text pad">
            <P style={{ maxWidth: '600px' }}>P: {textString}</P>
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
            <M style={{ maxWidth: '480px' }}>M: {textString}</M>
          </div>
          <div className="wrap-text pad">
            <MS style={{ maxWidth: '480px' }}>MS: {textString}</MS>
          </div>
          <div className="wrap-text pad">
            <MXS style={{ maxWidth: '480px' }}>MXS: {textString}</MXS>
          </div>
        </div>
      </div>
      {/** Icons */}
      <div className="kop__icons">
        <div className="pad wrap">
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
        <div className="pad wrap">
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
        <div className="pad wrap">
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
        <div className="bg--charcoal">
          <div className="pad wrap">
            <Icon mainStyle="pill" subStyle="white">
              <Icons.Heart />
            </Icon>
          </div>
        </div>
      </div>
      {/** Buttons */}
      <div className="kop__buttons">
        <div className="wrap">
          <div className="pad">
            <ButtonGroup>
              <Button mainStyle="login">Log In</Button>
              <Button mainStyle="login" subStyle="purple">Log In</Button>
              <Button mainStyle="login" subStyle="teal">Log In</Button>
              <Button mainStyle="login" subStyle="blue">Log In</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="bg--charcoal">
          <div className="wrap pad">
            <ButtonGroup>
              <Button mainStyle="login" subStyle="white">Log In</Button>
              <Button mainStyle="login" subStyle="purple">Log In</Button>
              <Button mainStyle="login" subStyle="teal">Log In</Button>
              <Button mainStyle="login" subStyle="blue">Log In</Button>
            </ButtonGroup>
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
        <div className="bg--charcoal">
          <div className="wrap pad">
            <ButtonGroup>
              <Button mainStyle="pill" subStyle="white">styles</Button>
              <Button mainStyle="pill" subStyle="purple">styles</Button>
              <Button mainStyle="pill" subStyle="teal">styles</Button>
              <Button mainStyle="pill" subStyle="blue">styles</Button>
            </ButtonGroup>
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
          <ButtonGroup className="pad">
            <Button mainStyle="pill" subStyle="purple">
              <span>colors</span>
            </Button>
            <Button mainStyle="pill" subStyle="teal">
              <span>colors</span>
            </Button>
            <Button mainStyle="pill" subStyle="blue">
              <span>colors</span>
            </Button>
          </ButtonGroup>
          <div className="pad">
            <Button mainStyle="pill" subStyle="jambonz">
              <Icons.Send />
              <span>Contact us</span>
            </Button>
          </div>
        </div>
        <div className="bg--jambonz">
          <div className="wrap pad">
            <Button subStyle="white">support@jambonz.org</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <KitOfParts textString={data['jambonz-ui'].text} />
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
