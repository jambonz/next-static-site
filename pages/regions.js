import Link from 'next/link';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Layout from '../src/components/layout';
import { Hero, Icon, P, H6 } from '../src/components/jambonz-ui';
import { getData } from '../src/lib/data';

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
              <P className="h6">
                <span className={`color--${region.color}`}>
                  {region.title}
                </span>
              </P>
            </div>
            <div className="regions__text">
              <P className="h6">
                <Link href={href}>
                  <a title={`jambonz ${region.title}`}>
                    <P className="i">
                      <span className="regions__text">{region.text}</span>
                      <Icon name="ExternalLink" />
                    </P>
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
      <Hero data={data.regions.hero} altStyle='pink'>
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