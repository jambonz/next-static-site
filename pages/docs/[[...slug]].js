import { useEffect } from 'react';

import Prism from 'prismjs';

import Layout from '../../src/components/layout';
import Markdown from '../../src/components/markdown';
import { getData, getMarkdown, getMarkdownPaths } from '../../src/lib/data';

export default function Docs({ data, docs }) {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });

  return (
    <Layout siteData={data.site}>
      <Markdown scope="docs" data={data.docs} docs={docs} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getMarkdownPaths('docs');

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getData('docs');
  const docs = await getMarkdown('docs', params.slug);

  return {
    props: {
      data,
      docs,
    },
  };
}
