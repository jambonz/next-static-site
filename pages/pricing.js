import { nanoid } from 'nanoid';

import Layout from '../components/layout';
import { Hero, Icon, Button, H2, H5, H6, P, M, MS } from '../components/jambonz-ui';
import { getData } from '../lib/data';

function Touts({data}) {
  return (
    <section className="bg-pink touts">
      <div className="wrap touts__wrap">
        {data.map((tout) => {
          return (
            <div key={nanoid()} className="touts__item">
              <Icon name={tout.icon} style="fill" subStyle={tout.color} />
              <P>{tout.text}</P>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Tiers({ data }) {
  return (
    <section className="tiers pad">
      <div className="wrap tiers__wrap">
        {data.tiers.map((tier) => {
          return (
            <div key={nanoid()} className="tiers__item">
              <H5><strong className={`color--${tier.color}`}>{tier.title}</strong></H5>
              <M>{tier.text}</M>
              {tier.table && (
                <div className={`table table--${tier.color} tiers__table`}>
                  {tier.table.head.map((headText, index) => {
                    const cellText = tier.table.body[index];

                    return (
                      <div key={nanoid()} className="table__row">
                        <div className="table__head">
                          <MS>{headText}</MS>
                        </div>
                        <div className="table__cell">
                          <MS>{cellText}</MS>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="tiers__cta">
        <P>{data.text}</P>
        <Button href={`${data.url}?subject=Additional Services Support`} target="_blank" style="pill" subStyle="jambonz">
          <Icon name={data.icon} />
          <span>{data.cta}</span>
        </Button>
      </div>
    </section>
  );
}

function Services({data}) {
  return (
    <section className="bg-grey services pad">
      <div className="wrap services__wrap">
        <div className="services__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="services__options">
          {data.services.map((service) => {
            return (
              <div key={nanoid()} className="services__option">
                <P>
                  <a className="i" href={`${data.url}?subject=${service.title} Support`} target="_blank">
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
      <Touts data={data.pricing.touts} />
      <Tiers data={data.pricing.structure} />
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
