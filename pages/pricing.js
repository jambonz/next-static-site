import Link from 'next/link';

import { nanoid } from 'nanoid';
import { Icon, Button, H2, P } from '@jambonz/ui-kit';

import { getData } from '../src/lib/data';
import { Icons } from '../src/components/icons';
import Layout, { Hero } from '../src/components/layout';
import { normalizeSubtext } from '../src/components/utils';

function Structure({data}) {
  const CtaIcon = Icons[data.cta.icon];
  return (
    <section className="structure">
      <div className="wrap structure__text">
        <>
          {normalizeSubtext(data.text).map((text) => {
            return <P className="h6" key={nanoid()}>{text}</P>;
          })}
        </>
      </div>
      <div className="wrap structure__cta">
        <P>{data.cta.text}</P>
        <Button as={Link} href={`${data.cta.url}?subject=Additional Services Support`} target="_blank" mainStyle="hollow">
          <CtaIcon />
          <span>{data.cta.cta}</span>
        </Button>
      </div>
    </section>
  );
}

function Services({data}) {
  const SvgIcon = Icons[data.icon];
  return (
    <section className="bg--pink services pad">
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
                    <Icons.ExternalLink />
                  </a>
                </P>
                <P>{service.text}</P>
              </div>
            );
          })}
        </div>
        <div className="services__cta">
          <Button as={Link} href={`${data.url}?subject=Additional Services Support`} target="_blank" mainStyle="hollow">
            <SvgIcon />
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
