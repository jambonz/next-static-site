import Layout from '../components/layout';
import { Hero } from '../components/jambonz-ui';
import { getData, getDocs } from '../lib/data';
import TextLayout from '../components/text-layout';

export default function Privacy({ data, docs }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.privacy.hero} subStyle="privacy" />
      <TextLayout data={docs} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('privacy');
  const docs = await getDocs(['rest', 'privacy.md']);

  return {
    props: {
      data,
      docs,
    },
  };
}
