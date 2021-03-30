import Link from 'next/link';
import Image from 'next/image';
import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Button, Icon } from './jambonz-ui';

export default function Kitofparts() {
  const text = 'jambonz is a self-hosted, “bring your own everything” open source CPaaS platform, developed by the creator of the drachtio open source sip server.';

  return (
    <>
      <div className="wrap padr">
        <div className="pad">
          <img src="/svg/jambonz.svg" width="128" />
        </div>
        <div className="pad">
          <H5>
            <div><strong>font</strong></div>
            <div>Objectivity (free, large family—16 styles)</div>
            <div>&nbsp;</div>
            <div><strong>specimen</strong></div>
            <div>
              <Link href="https://www.fontsquirrel.com/fonts/objectivity">
                <a target="_blank">www.fontsquirrel.com/fonts/objectivity</a>
              </Link>
            </div>
            <div>
              <Link href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
                <a target="_blank">www.behance.net/gallery/60530395/Objectivity-Free-Font-Family</a>
              </Link>
            </div>
            <div>&nbsp;</div>
            <div><strong>icons</strong></div>
            <div>Feather (free, large set—286 icons)</div>
            <div>&nbsp;</div>
            <div><strong>specimen</strong></div>
            <div>
              <Link href="https://feathericons.com">
                <a target="_blank">feathericons.com</a>
              </Link>
            </div>
            <div>
              <Link href="https://github.com/feathericons/react-feather">
                <a target="_blank">github.com/feathericons/react-feather</a>
              </Link>
            </div>
          </H5>
        </div>
        <div className="wrap-text pad">
          <H1>{text}</H1>
        </div>
        <div className="wrap-text pad">
          <H2>{text}</H2>
        </div>
        <div className="wrap-text pad">
          <H3>{text}</H3>
        </div>
        <div className="wrap-text pad">
          <H4>{text}</H4>
        </div>
        <div className="wrap-text pad">
          <H5>{text}</H5>
        </div>
        <div className="wrap-text pad">
          <H6>{text}</H6>
        </div>
        <div className="wrap-text pad">
          <P>{text}</P>
        </div>
        <div className="wrap-text pad">
          <M>{text}</M>
        </div>
        <div className="wrap-text pad">
          <MS>{text}</MS>
        </div>
        <div className="wrap-text pad">
          <MXS>{text}</MXS>
        </div>
        <div className="pad">
          <Image src="/images/Jambonz_app_screenshot.png" width={1280 / 2} height={842 / 2} />
        </div>
        <div className="icons pad">
          <Icon style="fill" name="Server" />
          <Icon style="fill" name="PhoneCall" />
          <Icon style="fill" name="Folder" />
          <Icon style="fill" name="Cloud" />
          <Icon style="pill" name="Heart" />
        </div>
        <div className="pad">
          <img src="/svg/drachtio.svg" width="128" />
        </div>
        <div className="pad">
          <Button href="#" target="_blank" style="login">Log In</Button>
        </div>
        <div className="pad">
          <Button href="#" target="_blank">Sign up for free</Button>
        </div>
        <div className="pad">
          <Button href="#" target="_blank" style="dark">Sign up for free</Button>
        </div>
        <div className="btns pad">
          <Button href="https://github.com/jambonz" target="_blank" style="pill">
            <Icon size={18} name="GitHub" />
            <span>github.com/jambonz</span>
          </Button>
          <Button href="https://github.com/drachtio" target="_blank" style="pill">
            <Icon size={18} name="GitHub" />
            <span>github.com/drachtio</span>
          </Button>
        </div>
      </div>
      <div className="pad bg-jambonz">
        <div className="wrap padr">
          <Button href="#" target="_blank" style="light">Sign up for free</Button>
        </div>
      </div>
    </>
  );
}