import Layout from '../components/layout';
import { Hero, Icon, Button, H5, H2, P } from '../components/jambonz-ui';
import { getData } from '../lib/data';
import { nanoid } from 'nanoid';

function Facts({data}) {
  return (
    <div className="bg-pink facts">
      <div className="wrap facts__wrap">
        {data.map((fact) => {
          return (
            <div key={nanoid()} className="facts__item">
              <Icon name={fact.icon} style="fill" />
              <div className="facts__text">
                <H5><strong>{fact.title}</strong></H5>
                <P>{fact.text}</P>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OS({data}) {
  return (
    <div className="os pad">
      <div className="wrap os__wrap">
        <div className="os__headline">
          <H2>
            <div dangerouslySetInnerHTML={{ __html: data.headline}} />
          </H2>
        </div>
        <div className="os__subtext">
          <H5>{data.subtext}</H5>
        </div>
        <div className="btns os__btns">
          {data.buttons.map((button) => {
            return (
              <Button key={nanoid()} href={button.url} target="_blank" style="pill">
                <Icon name={button.icon} />
                <span>{button.text}</span>
              </Button>
            );
          })}
        </div>
        <div className="os__logo">
          <img src={data.logo} />
          <Icon name={data.icon} style="pill" />
        </div>
        <div className="os__cta">
          <Button href={data.url} subStyle="dark" target="_blank">{data.cta}</Button>
        </div>
      </div>
    </div>
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
