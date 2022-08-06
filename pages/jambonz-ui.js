import Link from 'next/link';

import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Icon, Button, IconGroup, ButtonGroup } from 'jambonz-ui';

import { getData } from '../src/lib/data';
import { Icons } from '../src/components/icons';
import Layout, { Hero } from '../src/components/layout';

function KitOfParts({ textString }) {
  return (
    <section className="kop" style={{ textAlign: 'center' }}>
      {/** Typography */}
      <div className="kop__typography">
        <div className="pad bg--black">
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <H1 style={{ maxWidth: '1024px' }}><span>H1:</span> {textString}</H1>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <H2 style={{ maxWidth: '850px' }}><span>H2:</span> {textString}</H2>
          </div>
        </div>
        <div className="pad bg--pink">
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <H3 style={{ maxWidth: '760px' }}><span>H3:</span> {textString}</H3>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <H4 style={{ maxWidth: '760px' }}><span>H4:</span> {textString}</H4>
          </div>
        </div>
        <div className="pad bg--grey">
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <H5 style={{ maxWidth: '660px' }}><span>H5:</span> {textString}</H5>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <H6 style={{ maxWidth: '620px' }}><span>H6:</span> {textString}</H6>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <P style={{ maxWidth: '600px' }}><span>P:</span> {textString}</P>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <P><span>P:</span> With a <strong>strong</strong> element</P>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <P><span>P:</span> With a <strong className="med">medium</strong> element</P>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <P><span>P:</span> With an <em>emphasized</em> element</P>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <P><span>P:</span> <span className="txt--blue">With</span> <span className="txt--teal">colored</span> <span className="txt--purple">text</span></P>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <M style={{ maxWidth: '480px' }}><span>M:</span> {textString}</M>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <MS style={{ maxWidth: '480px' }}><span>MS:</span> {textString}</MS>
          </div>
          <div className="pad" style={{ display: 'flex', justifyContent: 'center' }}>
            <MXS style={{ maxWidth: '480px' }}><span>MXS:</span> {textString}</MXS>
          </div>
        </div>
      </div>
      {/** Icons */}
      <div className="kop__icons">
        <div className="pad wrap">
          <IconGroup>
            {Object.keys(Icons).map((icon) => {
              const SvgIcon = Icons[icon];
              return (
                <Icon key={icon}>
                  <SvgIcon />
                </Icon>
              );
            })}
          </IconGroup>
        </div>
        <div className="pad wrap">
          <IconGroup>
            <Icon subStyle="dark">
              <Icons.MapPin />
            </Icon>
            <Icon subStyle="purple">
              <Icons.MapPin />
            </Icon>
            <Icon subStyle="teal">
              <Icons.MapPin />
            </Icon>
            <Icon subStyle="blue">
              <Icons.MapPin />
            </Icon>
          </IconGroup>
        </div>
        <div className="pad wrap">
          <IconGroup>
            <Icon mainStyle="hollow" subStyle="dark">
              <Icons.Heart />
            </Icon>
            <Icon mainStyle="hollow" subStyle="purple">
              <Icons.Heart />
            </Icon>
            <Icon mainStyle="hollow" subStyle="teal">
              <Icons.Heart />
            </Icon>
            <Icon mainStyle="hollow" subStyle="blue">
              <Icons.Heart />
            </Icon>
            <Icon mainStyle="hollow">
              <Icons.Heart />
            </Icon>
          </IconGroup>
        </div>
        <div className="bg--dark">
          <IconGroup className="pad wrap">
            <Icon mainStyle="hollow" subStyle="white">
              <Icons.Heart />
            </Icon>
            <Icon subStyle="white">
              <Icons.Heart />
            </Icon>
          </IconGroup>
        </div>
      </div>
      {/** Buttons */}
      <div className="kop__buttons">
        <div className="wrap">
          <div className="pad">
            <ButtonGroup>
              <Button small mainStyle="hollow">Log In</Button>
              <Button small mainStyle="hollow" subStyle="purple">Log In</Button>
              <Button small mainStyle="hollow" subStyle="teal">Log In</Button>
              <Button small mainStyle="hollow" subStyle="blue">Log In</Button>
            </ButtonGroup>
          </div>
          <div className="pad">
            <ButtonGroup>
              <Button small>Log In</Button>
              <Button small subStyle="purple">Log In</Button>
              <Button small subStyle="teal">Log In</Button>
              <Button small subStyle="blue">Log In</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="bg--dark">
          <div className="wrap">
            <ButtonGroup className="pad">
              <Button small mainStyle="hollow" subStyle="white">Log In</Button>
              <Button small mainStyle="hollow" subStyle="purple">Log In</Button>
              <Button small mainStyle="hollow" subStyle="teal">Log In</Button>
              <Button small mainStyle="hollow" subStyle="blue">Log In</Button>
            </ButtonGroup>
            <ButtonGroup className="pad">
              <Button small subStyle="white">Log In</Button>
              <Button small subStyle="purple">Log In</Button>
              <Button small subStyle="teal">Log In</Button>
              <Button small subStyle="blue">Log In</Button>
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
        <div className="bg--dark">
          <div className="wrap pad">
            <ButtonGroup>
              <Button mainStyle="hollow" subStyle="white">styles</Button>
              <Button mainStyle="hollow" subStyle="purple">styles</Button>
              <Button mainStyle="hollow" subStyle="teal">styles</Button>
              <Button mainStyle="hollow" subStyle="blue">styles</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="wrap">
          <ButtonGroup className="pad">
            <Button mainStyle="hollow" subStyle="dark">
              <Icons.GitHub />
              <span>github.com/jambonz</span>
            </Button>
            <Button mainStyle="hollow" subStyle="dark">
              <Icons.GitHub />
              <span>github.com/drachtio</span>
            </Button>
          </ButtonGroup>
          <ButtonGroup className="pad">
            <Button mainStyle="hollow" subStyle="purple">
              <span>colors</span>
            </Button>
            <Button mainStyle="hollow" subStyle="teal">
              <span>colors</span>
            </Button>
            <Button mainStyle="hollow" subStyle="blue">
              <span>colors</span>
            </Button>
          </ButtonGroup>
          <div className="pad">
            <Button mainStyle="hollow">
              <Icons.Send />
              <span>Contact us</span>
            </Button>
          </div>
        </div>
        <div className="bg--jam">
          <div className="wrap pad">
            <Button subStyle="white">support@jambonz.org</Button>
          </div>
        </div>
      </div>
    </section>
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
