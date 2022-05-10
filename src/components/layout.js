import Head from 'next/head';
import Link from 'next/link';

import Navi from './navi';
import Footer from './footer';

function Banner({ data }) {
  return (
    <div className="banner">
      <Link href={data.link}>
        <a target="_blank" className="wrap">{data.text}</a>
      </Link>
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
