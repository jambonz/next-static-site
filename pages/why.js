import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Why({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.why.hero} subStyle="why" />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('why');

  return {
    props: {
      data,
    },
  };
}
