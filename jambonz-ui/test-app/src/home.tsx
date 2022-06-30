import React, { useReducer } from 'react';

import { Icons } from '../../src/js/icons';
import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Icon, Button, IconGroup, ButtonGroup } from '../../src/js/index';

import { reducer, initialState } from './state';

const textString = 'jambonz is a self-hosted, “bring your own everything” open source CPaaS platform, developed by the creator of the drachtio open source sip server.';

export const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = () => {
    dispatch({ type: 'click' });
  };

  return (
    <div className="kit-of-parts">
      <div className="wrap">
        <div className="pad">
          <Button onClick={handleClick} subStyle="teal">
            Click for simple state test: {state.clicks} clicks...
          </Button>
        </div>
      </div>
      <div className="pad bg--black">
        <div className="wrap">
          <div className="wrap-text">
            <H1>H1: {textString}</H1>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H2>H2: {textString}</H2>
        </div>
      </div>
      <div className="pad bg--pink">
        <div className="wrap">
          <div className="wrap-text">
            <H3>H3: {textString}</H3>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H4>H4: {textString}</H4>
        </div>
      </div>
      <div className="pad bg--grey">
        <div className="wrap">
          <div className="wrap-text">
            <H5>H5: {textString}</H5>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="wrap-text pad">
          <H6>H6: {textString}</H6>
        </div>
        <div className="wrap-text pad">
          <P>P: {textString}</P>
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
          <M>M: {textString}</M>
        </div>
        <div className="wrap-text pad">
          <MS>MS: {textString}</MS>
        </div>
        <div className="wrap-text pad">
          <MXS>MXS: {textString}</MXS>
        </div>
      </div>
      <div className="wrap">
        <div className="pad">
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
        <div className="pad">
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
        <div className="pad">
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
        <div className="pad">
          <Button mainStyle="login">Log In</Button>
        </div>
      </div>
      <div className="bg--charcoal">
        <div className="pad">
          <Icon mainStyle="pill" subStyle="white">
            <Icons.Heart />
          </Icon>
        </div>
      </div>
      <div className="bg--charcoal">
        <div className="pad">
          <Button mainStyle="login" subStyle="white">Log In</Button>
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
      <div className="bg--jambonz">
        <div className="pad">
          <Button subStyle="light">support@jambonz.org</Button>
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
        <div className="pad">
          <Button mainStyle="pill" subStyle="jambonz">
            <Icons.Send />
            <span>Contact us</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
