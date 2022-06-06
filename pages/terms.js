import Layout from '../src/components/layout';
import { Hero, TextLayout } from '../src/components/jambonz-ui';
import { getData, getParsedMarkdown } from '../src/lib/data';
import path from 'path';

export default function Terms({ data, parsed }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.terms.hero} subStyle="terms" />
      <section className="wrap pad-b">
        <TextLayout data={parsed} name="terms" />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('terms');
  
  // Use the new public method in a more ad hoc manner like this...
  const parsed = await getParsedMarkdown(path.join(process.cwd(), 'markdown', 'terms.md'));

  return {
    props: {
      data,
      parsed,
    },
  };
}
