import Head from 'next/head';

import Navi from './navi';
import Footer from './footer';

export default function Layout({ children, siteData, title = "jambonz" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="The “bring your own everything” CPaaS"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        {/*
          manifest.json provides metadata used when your web app is installed on a
          user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navi siteData={siteData} />
      <main className="main">
        {children}
      </main>
      <Footer siteData={siteData} />
    </>
  );
}