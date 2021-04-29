import Layout from '../components/layout';
import { Hero, TextLayout } from '../components/jambonz-ui';
import { getData, getParsedMarkdown } from '../lib/data';

// You'll need to load the nodejs path module
import path from 'path';

export default function Privacy({ data, parsed }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.privacy.hero} subStyle="privacy" />
      <TextLayout data={parsed} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('privacy');

  // Use the new public method in a more ad hoc manner like this...
  const parsed = await getParsedMarkdown(path.join(process.cwd(), 'pages', 'privacy.md'));

  return {
    props: {
      data,
      parsed,
    },
  };
}
