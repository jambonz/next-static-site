import Link from 'next/link';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Layout from '../src/components/layout';
import { Hero, Icon, P } from '../src/components/jambonz-ui';
import { getData } from '../src/lib/data';

function Regions({ data }) {
  const router = useRouter();
  const redirect = router.query.redirect;

  return (
    <>
      {data.regions.map((region) => {
        const href = (redirect === 'login') ? region.url : region.altUrl;

        return (
          <div key={nanoid()} region={region.name} className="wrap regions__wrap">
            <div className="regions__icon">
              <Link href={href}>
                <a>
                  <Icon name={region.icon} subStyle={region.color} mainStyle="fill" />
                </a>
              </Link>
            </div>
            <P className='h6'>
              <span style={`color:${region.color}`}>{region.title}</span>
            </P>
            <div className="i">
              <Link href={href}>
                <a>
                  <P className='h6'>
                    <span style='color:black'>{region.text}</span>
                    <Icon name="ExternalLink" />
                  </P>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </>
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