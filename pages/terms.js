import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData, getDocs } from '../lib/data';
import TextLayout from '../components/text-layout';

export default function Terms({ data, docs }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.terms.hero} subStyle="terms" />
      <TextLayout data={docs} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('terms');
  const docs = await getDocs(['rest', 'terms.md']);

  return {
    props: {
      data,
      docs,
    },
  };
}
