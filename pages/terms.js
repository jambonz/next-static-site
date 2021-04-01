import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Terms({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.terms.hero} subStyle="terms" />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('terms');

  return {
    props: {
      data,
    },
  };
}
