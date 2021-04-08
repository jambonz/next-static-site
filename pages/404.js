import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Page404({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data['404'].hero} subStyle="404" />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('404');

  return {
    props: {
      data,
    },
  };
}
