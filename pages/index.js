import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Home({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.home.hero} subStyle="home" />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('home');

  return {
    props: {
      data,
    },
  };
}
