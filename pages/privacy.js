import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Privacy({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.privacy.hero} subStyle="privacy" />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('privacy');

  return {
    props: {
      data,
    },
  };
}
