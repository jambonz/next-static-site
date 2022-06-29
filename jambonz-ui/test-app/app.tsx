import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { P, M, MS, MXS, H1, H2, H3, H4, H5, H6, Icon, Button, IconGroup, ButtonGroup, Icons } from '../src/js/index';

import '../pkg/public/css/styles.css';
import './app.css';

const textString = 'jambonz is a self-hosted, “bring your own everything” open source CPaaS platform, developed by the creator of the drachtio open source sip server.';

const AppLayout = () => (
  <Outlet />
);

const HomePage = () => (
  <div className="kit-of-parts">
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
            return <Icon key={icon} mainStyle="fill" name={icon} />;
          })}
        </IconGroup>
      </div>
      <div className="pad">
        <IconGroup set>
          <Icon mainStyle="fill" subStyle="dark" name="MapPin" />
          <Icon mainStyle="fill" subStyle="purple" name="MapPin" />
          <Icon mainStyle="fill" subStyle="teal" name="MapPin" />
          <Icon mainStyle="fill" subStyle="blue" name="MapPin" />
        </IconGroup>
      </div>
      <div className="pad">
        <IconGroup set>
          <Icon mainStyle="pill" subStyle="dark" name="Heart" />
          <Icon mainStyle="pill" subStyle="purple" name="Heart" />
          <Icon mainStyle="pill" subStyle="teal" name="Heart" />
          <Icon mainStyle="pill" subStyle="blue" name="Heart" />
          <Icon mainStyle="pill" name="Heart" />
        </IconGroup>
      </div>
      <div className="pad">
        <Button mainStyle="login">Log In</Button>
      </div>
    </div>
    <div className="bg--charcoal">
      <div className="pad">
        <Icon mainStyle="pill" subStyle="white" name="Heart" />
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
          <Icon name="GitHub" />
          <span>github.com/jambonz</span>
        </Button>
        <Button mainStyle="pill">
          <Icon name="GitHub" />
          <span>github.com/drachtio</span>
        </Button>
      </ButtonGroup>
      <div className="pad">
        <Button mainStyle="pill" subStyle="jambonz">
          <Icon name="Send" />
          <span>Contact us</span>
        </Button>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export const elem = document.getElementById('root') as HTMLElement;
export const root = createRoot(elem);

root.render(<App />);