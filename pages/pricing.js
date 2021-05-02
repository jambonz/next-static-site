import { nanoid } from 'nanoid';

import Layout from '../components/layout';
import { Hero, Icon, Button, H2, H6, P, normalizeSubtext } from '../components/jambonz-ui';
import { getData } from '../lib/data';

function Structure({data}) {
  return (
    <section className="structure">
      <div className="wrap structure__text">
        <>
          {normalizeSubtext(data.text).map((text) => {
            return <H6 key={nanoid()}>{text}</H6>;
          })}
        </>
      </div>
      <div className="wrap structure__cta">
        <P>{data.cta.text}</P>
        <Button href={`${data.cta.url}?subject=Additional Services Support`} target="_blank" style="pill" subStyle="jambonz">
          <Icon name={data.cta.icon} />
          <span>{data.cta.cta}</span>
        </Button>
      </div>
    </section>
  );
}

function Services({data}) {
  return (
    <section className="bg-pink services pad">
      <div className="wrap services__wrap">
        <div className="services__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="services__options">
          {data.services.map((service) => {
            return (
              <div key={nanoid()} className="services__option">
                <P>
                  <a className="i" href={`${data.url}?subject=${service.title} Support`} target="_blank" rel="noreferrer">
                    <strong>{service.title}</strong>
                    <Icon name="ExternalLink" />
                  </a>
                </P>
                <P>{service.text}</P>
              </div>
            );
          })}
        </div>
        <div className="services__cta">
          <Button href={`${data.url}?subject=Additional Services Support`} target="_blank" style="pill" subStyle="jambonz">
            <Icon name={data.icon} />
            <span>{data.cta}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Pricing({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.pricing.hero} subStyle="pricing" />
      <Structure data={data.pricing.structure} />
      <Services data={data.pricing.additional} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('pricing');

  return {
    props: {
      data,
    },
  };
}
