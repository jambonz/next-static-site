import '../src/styles/global.scss';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { usePageViewTracking } from '../src/components/hooks.js';


const gtagId = 'G-7J55WH6BVM';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({
      gtmId: gtagId,
      dataLayer: {
        gtag_id: gtagId,
        config: {
          [gtagId]: { groups: 'default' },
        },
      },
    });
  }, []);

  usePageViewTracking(gtagId);

  return <Component {...pageProps} />;
}




