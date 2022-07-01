import Head from 'next/head';
import Link from 'next/link';

import { nanoid } from 'nanoid';
import { classNames, H1, H2, H3, Button } from '@jambonz/ui';

import Navi from './navi';
import Footer from './footer';
import { normalizeSubtext } from './utils';

export function Banner({ data }) {
  return (
    <div className="banner">
      <Link href={data.link}>
        <a target="_blank" className="wrap">{data.text}</a>
      </Link>
    </div>
  );
}

export function Latest({ data }) {
  const classes = {
    'latest': true,
    [`latest--${data.label}`]: true,
    'pad': true,
    'bg--pink': true,
  };

  return (
    <section className={classNames(classes)}>
      <div className="wrap latest__wrap">
        <div className="latest__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="latest__subtext">
          <H3 className="h5">
            {/* Use dangerouslySetInnerHTML to render inline links from YAML data */}
            {normalizeSubtext(data.subtext).map((subtext) => {
              return <div key={nanoid()} dangerouslySetInnerHTML={{ __html: subtext }} />;
            })}
          </H3>
        </div>
      </div>
    </section>
  );
}

export function Hero({ data = {}, subStyle, altStyle, children }) {
  const classes = {
    'hero': true,
    'pad': true,
  };

  if (subStyle) {
    classes[`hero--${subStyle}`] = true;
  }

  if (altStyle) {
    classes[`hero--${altStyle}`] = true;
  }

  return (
    <section className={classNames(classes)}>
      <div className="wrap hero__wrap">
        {data.headline && (
          <div className="hero__headline">
            <H1>{data.headline}</H1>
          </div>
        )}
        {data.subtext && (
          <div className="hero__subtext">
            <H2 className="h5">
              {normalizeSubtext(data.subtext).map((subtext) => {
                return <div key={nanoid()}>{subtext}</div>;
              })}
            </H2>
          </div>
        )}
        {data.cta && (
          <div className="hero__cta">
            <Button as={Link} href={data.url}>{data.cta}</Button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function TextLayout({ data, name }) {
  return (
    <div className={`text-layout text-layout--${name}`}>
      <div className="text-layout__wrap" dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  );
}

export default function Layout({ children, siteData, title = 'jambonz' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="image" property="og:image" content="https://www.jambonz.org/jambonz.png" />
        <meta name="description" content="The “bring your own everything” CPaaS" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/fonts/objectivity-medium-webfont.woff2" crossOrigin="anonymous" as="font" type="font/woff" />
        <link rel="preload" href="/fonts/objectivity-bold-webfont.woff2" crossOrigin="anonymous" as="font" type="font/woff" />
        <link rel="preload" href="/fonts/objectivity-regular-webfont.woff2" crossOrigin="anonymous" as="font" type="font/woff" />
        <link rel="preload" href="/fonts/objectivity-boldslanted-webfont.woff2" crossOrigin="anonymous" as="font" type="font/woff" />
        <link rel="preload" href="/fonts/objectivity-regularslanted-webfont.woff2" crossOrigin="anonymous" as="font" type="font/woff" />
      </Head>
      {siteData.banner && siteData.banner.active && <Banner data={siteData.banner} />}
      <Navi siteData={siteData} />
      <main className="main">
        {children}
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
