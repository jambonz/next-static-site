import '../src/styles/global.scss';
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

const gtmId = 'G-7J55WH6BVM';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId })
  }, []);
  return <Component {...pageProps} />
}