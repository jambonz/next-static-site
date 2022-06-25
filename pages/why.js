import Link from 'next/link';

import { nanoid } from 'nanoid';
import { Icon, Button, H3, H2, P, ButtonGroup } from '@jambonz/ui';

import { getData } from '../src/lib/data';
import Layout, { Hero } from '../src/components/layout';

function Facts({data}) {
  return (
    <section className="bg--pink facts">
      <div className="wrap facts__wrap">
        <div className="facts__items">
          {data.map((fact) => {
            return (
              <div key={nanoid()} className="facts__item">
                <Icon name={fact.icon} mainStyle="fill" />
                <div className="facts__text">
                  <P className="h5"><strong>{fact.title}</strong></P>
                  <P>{fact.text}</P>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OS({data}) {
  return (
    <section className="os pad">
      <div className="wrap os__wrap">
        <div className="os__headline">
          <H2>
            <div dangerouslySetInnerHTML={{ __html: data.headline}} />
          </H2>
        </div>
        <div className="os__subtext">
          <H3 className="h5">{data.subtext}</H3>
        </div>
        <ButtonGroup className="os__btns">
          {data.buttons.map((button) => {
            return (
              <Button Link={Link} key={nanoid()} href={button.url} target="_blank" mainStyle="pill">
                <Icon name={button.icon} />
                <span>{button.text}</span>
              </Button>
            );
          })}
        </ButtonGroup>
        <div className="os__logo">
          <img src={data.logo} width="313" height="71" alt="drachtio" />
          <Button Link={Link} href="https://github.com/sponsors/drachtio/" target="_blank" mainStyle="pill" subStyle="jambonz">
            <Icon name="Heart" />
            <span>Sponsor</span>
          </Button>
        </div>
        <div className="os__cta">
          <Button Link={Link} href={data.url} subStyle="dark" >{data.cta}</Button>
        </div>
      </div>
    </section>
  );
}

export default function Why({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.why.hero} subStyle="why" />
      <Facts data={data.why.facts} />
      <OS data={data.why.os} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('why');

  return {
    props: {
      data,
    },
  };
}
