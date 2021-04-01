import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Pricing({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.pricing.hero} subStyle="pricing" />
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
