import Layout from '../components/layout';
import { Hero, TextLayout } from '../components/jambonz-ui';
import { getData, getParsedMarkdown } from '../lib/data';
import path from 'path';

export default function Terms({ data, parsed }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.terms.hero} subStyle="terms" />
      <div class="wrap">
        <TextLayout data={parsed} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('terms');
  
  // Use the new public method in a more ad hoc manner like this...
  const parsed = await getParsedMarkdown(path.join(process.cwd(), 'pages', 'terms.md'));

  return {
    props: {
      data,
      parsed,
    },
  };
}
