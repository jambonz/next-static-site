import { useRouter } from 'next/router';

import { useState, useEffect, useCallback } from 'react';

import { rSlash } from './utils';

export function usePageViewTracking(gtagId) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.dataLayer.push({
        event: 'page_view',
        gtag_id: gtagId,
        config: {
          [gtagId]: {
            page_path: url,
            groups: 'default',
          },
        },
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, gtagId]);
}

export function useActiveNavi() {
  const router = useRouter();
  const cleanPath = router.asPath.replace(rSlash, '').split('/')[0];
  return cleanPath;
}

export function useMobileMedia() {
  const [mobile, setMobile] = useState(false);

  const handleMedia = useCallback((e) => {
    setMobile(e.matches);
  }, [setMobile]);

  useEffect(() => {
    const str = window.getComputedStyle(document.documentElement);
    const qry = str.getPropertyValue('--mobile-media');
    const mql = window.matchMedia(`(max-width: ${qry})`);

    mql.addEventListener('change', handleMedia);

    setMobile(mql.matches);

    return function cleanup() {
      mql.removeEventListener('change', handleMedia);
    };
  }, [handleMedia, setMobile]);

  return mobile;
}
