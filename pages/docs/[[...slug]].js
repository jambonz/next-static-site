import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import Prism from 'prismjs';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import { Icon } from '../../components/jambonz-ui';
import { getData, getDocs, getDocsPaths } from '../../lib/data';

function Sidebar({data}) {
  const router = useRouter();
  const [active, setActive] = useState({
    [data.navi[0].path]: true,
  });

  const handleToggle = (slug) => {
    setActive((oldActive) => {
      const newActive = {};

      for (let i in oldActive) {
        newActive[i] = oldActive[i];
      }

      newActive[slug] = newActive[slug] ? false : true;

      return newActive;
    });
  };

  return (
    <nav className="bg-pink docs__navi">
      <ul className="docs__list">
        {data.navi.map((item) => {
          const isActiveToggle = (active[item.path] ? true : false);
          const subClasses = {
            'docs__sublist': true,
            'active': isActiveToggle,
          };

          return (
            <li key={nanoid()} className="docs__item">
              <div className="m docs__label" onClick={() => handleToggle(item.path)}>
                <strong>{item.title}</strong>
                {isActiveToggle ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" />}
              </div>
              <ul className={classNames(subClasses)}>
                {item.pages.map((page) => {
                  const isActiveItem = (router.asPath.split('/').pop() === page.path);
                  const itemClasses = {
                    'ms': true,
                    'active': isActiveItem,
                  };

                  return (
                    <li key={nanoid()} className="docs__subitem">
                      <Link href={`/docs/${item.path}/${page.path}`}>
                        <a className={classNames(itemClasses)}>{page.title}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Docs({ data, docs }) {
  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  });

  return (
    <Layout siteData={data.site}>
      <div className="docs">
        <div className="wrap docs__wrap">
          <Sidebar data={data.docs} />
          <div className="docs__html">
            <div dangerouslySetInnerHTML={{ __html: docs.contentHtml }} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getDocsPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = getData('docs');
  const docs = await getDocs(params.slug);

  return {
    props: {
      data,
      docs,
    },
  };
}
