import Layout from '../src/components/layout';
import { Hero, TextLayout } from '../src/components/jambonz-ui';
import { getData, getParsedMarkdown } from '../src/lib/data';
import path from 'path';

export default function Privacy({ data, parsed }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.privacy.hero} subStyle="privacy" />
      <section className="wrap pad-b">
        <TextLayout data={parsed} name="privacy" />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('privacy');

  // Use the new public method in a more ad hoc manner like this...
  const parsed = await getParsedMarkdown(path.join(process.cwd(), 'markdown', 'privacy.md'));

  return {
    props: {
      data,
      parsed,
    },
  };
}
