import Link from 'next/link';

import { nanoid } from 'nanoid';
import { Icon, Button, H3, H2, P, ButtonGroup } from 'jambonz-ui';

import { getData } from '../src/lib/data';
import { Icons } from '../src/components/icons';
import Layout, { Hero } from '../src/components/layout';

function Facts({data}) {
  return (
    <section className="bg--pink facts">
      <div className="wrap facts__wrap">
        <div className="facts__items">
          {data.map((fact) => {
            const FactIcon = Icons[fact.icon];
            return (
              <div key={nanoid()} className="facts__item">
                <Icon mainStyle="fill">
                  <FactIcon />
                </Icon>
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
            const BtnIcon = Icons[button.icon];
            return (
              <Button as={Link} key={nanoid()} href={button.url} target="_blank" mainStyle="hollow" subStyle="dark">
                <BtnIcon />
                <span>{button.text}</span>
              </Button>
            );
          })}
        </ButtonGroup>
        <div className="os__logo">
          <img src={data.logo} width="313" height="71" alt="drachtio" />
          <Button as={Link} href="https://github.com/sponsors/drachtio/" target="_blank" mainStyle="hollow">
            <Icons.Heart />
            <span>Sponsor</span>
          </Button>
        </div>
        <div className="os__cta">
          <Button as={Link} href={data.url} subStyle="dark" >{data.cta}</Button>
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
