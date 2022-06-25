import Prism from 'prismjs';
import { useEffect } from 'react';

import Layout from '../../src/components/layout';
import Markdown from '../../src/components/markdown';
import { getData, getMarkdown, getMarkdownPaths } from '../../src/lib/data';

export default function OpenSource({ data, docs }) {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });

  return (
    <Layout siteData={data.site}>
      <Markdown scope="open-source" data={data['open-source']} docs={docs} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getMarkdownPaths('open-source');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getData('open-source');
  const docs = await getMarkdown('open-source', params.slug);

  return {
    props: {
      data,
      docs,
    },
  };
}
