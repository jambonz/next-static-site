import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import classNames from 'classnames';
import Prism from 'prismjs';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import { Icon, TextLayout } from '../../components/jambonz-ui';
import { getData, getDocs, getDocsPaths } from '../../lib/data';

function Sidebar({data}) {
  const router = useRouter();
  const parsedTab = router.asPath.replace(/^\/docs\/|^\/+|\/+$/g, '').split('/').shift();
  const parsedPath = router.asPath.replace(/^\/+|\/+$/g, '').split('/').pop();
  const [active, setActive] = useState({
    [parsedTab]: true,
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
    <nav className="docs__navi">
      <div className="docs__link">
        <Link href={data.root.link}>
          <a className="m">
            <strong>{data.root.label}</strong>
          </a>
        </Link>
      </div>
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
                {isActiveToggle ? <Icon name="ChevronDown" /> : <Icon name="ChevronRight" />}
                <strong>{item.title}</strong>
              </div>
              <ul className={classNames(subClasses)}>
                {item.pages.map((page) => {
                  const isActiveItem = (parsedPath === page.path && parsedTab === item.path) && isActiveToggle;
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
          <TextLayout data={docs} />
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
