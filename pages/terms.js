import Layout from '../components/layout';
import { Hero, H1 } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Terms({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero>
        <H1>{data.terms.h1}</H1>
      </Hero>
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
