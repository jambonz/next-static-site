import { getData } from '../src/lib/data';
import Layout, { Hero } from '../src/components/layout';

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
