import Layout from '../components/layout';
import KitOfParts from '../components/kit-of-parts';
import { getData } from '../lib/data';

export default function KOP({ data }) {
  return (
    <Layout siteData={data.site}>
      <KitOfParts pageData={data.kop} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('kop');

  return {
    props: {
      data,
    },
  };
}
