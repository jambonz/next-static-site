import Prism from 'prismjs';
import { useEffect } from 'react';

import Layout from '../../src/components/layout';
import Markdown from '../../src/components/markdown';
import { getData, getMarkdown, getMarkdownPaths } from '../../src/lib/data';

export default function Support({ data, docs }) {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });

  return (
    <Layout siteData={data.site}>
      <Markdown scope="support" data={data['support']} docs={docs} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getMarkdownPaths('support');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getData('support');
  const docs = await getMarkdown('support', params.slug);

  return {
    props: {
      data,
      docs,
    },
  };
}
