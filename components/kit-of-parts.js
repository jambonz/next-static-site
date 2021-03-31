import Link from 'next/link';
import Image from 'next/image';
import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Button, Icon } from './jambonz-ui';

export default function KitOfParts({pageData}) {
  return (
    <>
      {/* High-level design information */}
      <div className="wrap">
        <div className="pad">
          <H5>
            <div><strong>font</strong></div>
            <div>Objectivity (free, large family—16 styles)</div>
            <div>
              <Link href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
                <a target="_blank">
                  <span>design</span>
                  <Icon name="ExternalLink" />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://www.fontsquirrel.com/fonts/objectivity">
                <a target="_blank">
                  <span>specimen</span>
                  <Icon name="ExternalLink" />
                </a>
              </Link>
            </div>
            <div>&nbsp;</div>
            <div><strong>icons</strong></div>
            <div>Feather (free, large set—286 icons)</div>
            <div>
              <Link href="https://feathericons.com">
                <a target="_blank">
                  <span>specimen</span>
                  <Icon name="ExternalLink" />
                </a>
              </Link>
            </div>
            <div>
              <Link href="https://github.com/feathericons/react-feather">
                <a target="_blank">
                  <span>react-feather</span>
                  <Icon name="ExternalLink" />
                </a>
              </Link>
            </div>
          </H5>
        </div>
      </div>
      {/* Show black background style */}
      <div className="pad bg-black">
        <div className="wrap">
          <div className="wrap-text">
            <H1>{pageData.text}</H1>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H2>{pageData.text}</H2>
        </div>
      </div>
      {/* Show pink background style */}
      <div className="pad bg-pink">
        <div className="wrap">
          <div className="wrap-text">
            <H3>{pageData.text}</H3>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H4>{pageData.text}</H4>
        </div>
      </div>
      {/* Show grey background style */}
      <div className="pad bg-grey">
        <div className="wrap">
          <div className="wrap-text">
            <H5>{pageData.text}</H5>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H6>{pageData.text}</H6>
        </div>
        <div className="wrap-text pad">
          <P>{pageData.text}</P>
        </div>
        <div className="wrap-text pad">
          <M>{pageData.text}</M>
        </div>
        <div className="wrap-text pad">
          <MS>{pageData.text}</MS>
        </div>
        <div className="wrap-text pad">
          <MXS>{pageData.text}</MXS>
        </div>
        <div className="pad">
          <Image src="/images/Jambonz_app_screenshot.png" width={1280 / 2} height={842 / 2} />
        </div>
        <div className="pad">
          <div className="icons">
            <Icon style="fill" name="Server" />
            <Icon style="fill" name="Folder" />
            <Icon style="fill" name="Cloud" />
            <Icon style="fill" name="Layers" />
            <Icon style="fill" name="UserCheck" />
            <Icon style="fill" name="Lock" />
            <Icon style="fill" name="ThumbsUp" />
            <Icon style="fill" subStyle="purple" name="Phone" />
            <Icon style="fill" subStyle="teal" name="PhoneCall" />
            <Icon style="fill" subStyle="blue" name="Activity" />
            <Icon style="pill" name="Heart" />
          </div>
        </div>
        <div className="pad">
          <img src="/svg/drachtio.svg" width="128" />
        </div>
        <div className="pad">
          <Button href="#" style="login">Log In</Button>
        </div>
        <div className="btns pad">
          <Button href="#">Button</Button>
          <Button href="#" subStyle="dark">styles...</Button>
        </div>
        <div className="btns pad">
          <Button href="#" subStyle="purple">Optional</Button>
          <Button href="#" subStyle="teal">button</Button>
          <Button href="#" subStyle="blue">styles...</Button>
        </div>
        <div className="btns pad">
          <Button href="https://github.com/jambonz" target="_blank" style="pill">
            <Icon name="GitHub" />
            <span>github.com/jambonz</span>
          </Button>
          <Button href="https://github.com/drachtio" target="_blank" style="pill">
            <Icon name="GitHub" />
            <span>github.com/drachtio</span>
          </Button>
        </div>
        <div className="pad">
          <Button href="#" style="pill" subStyle="jambonz">
            <Icon name="Send" />
            <span>Contact us to get started</span>
          </Button>
        </div>
      </div>
      {/* Show jambonz background style */}
      <div className="pad bg-jambonz">
        <div className="wrap">
          <Button href="#" target="_blank" subStyle="light">Footer button...</Button>
        </div>
      </div>
    </>
  );
}