import Link from 'next/link';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Layout from '../src/components/layout';
import { Hero, H6, Icon } from '../src/components/jambonz-ui';
import { getData } from '../src/lib/data';

function Regions({ data }) {
  const router = useRouter();
  const cta = router.query.redirect;

  return (
    <section className="regions">
      {data.regions.map((region) => {
        return (
          <div key={nanoid()} region={region.name} className="wrap regions__wrap">
            <div className="regions__icon">
              <Link href={cta === 'login' ? region.url : region.altUrl}>
                <a>
                  <Icon name={region.icon} subStyle={region.color} mainStyle="fill" />
                </a>
              </Link>
            </div>
            <div className="regions__title">
              <H6>
                {region.title}
              </H6>
            </div>
            <div className="regions__text">
              <Link href={cta === 'login' ? region.url : region.altUrl}>
                <a>
                  <H6>
                    {region.text}
                    <Icon name="ExternalLink" />
                  </H6>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </section >
  );
}
export default function RegionsPage({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.regions.hero} />
      <Regions data={data.regions} />
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