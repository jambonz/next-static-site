import Link from 'next/link';
import { useRouter } from 'next/router';

import { nanoid } from 'nanoid';
import { Icon, P } from '@jambonz/ui';

import { getData } from '../src/lib/data';
import Layout, { Hero } from '../src/components/layout';

function Regions({ data }) {
  const router = useRouter();
  const redirect = router.query.redirect;

  return (
    <section className="regions">
      {data.regions.map((region) => {
        const href = (redirect === 'login') ? region.url : region.altUrl;

        return (
          <div key={nanoid()} className="wrap regions__wrap">
            <div className="regions__icon">
              <Icon name={region.icon} subStyle={region.color} mainStyle="fill" />
            </div>
            <div className="regions__title">
              <P className={`med color--${region.color}`}>
                {region.title}
              </P>
            </div>
            <div className="regions__text">
              <P className="med">
                <Link href={href}>
                  <a className="i" title={`jambonz ${region.title}`}>
                    <span className="regions__text">{region.text}</span>
                    <Icon name="ExternalLink" />
                  </a>
                </Link>
              </P>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function RegionsPage({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.regions.hero} altStyle="pink">
        <Regions data={data.regions} />
      </Hero>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('regions');

  return {
    props: {
      data,
    },
  };
}