import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import { classNames, Icon } from '@jambonz/ui';

import { Icons } from './icons';
import { TextLayout } from './layout';

function MarkdownSidebar({scope, data}) {
  const router = useRouter();
  const regex = new RegExp(`^/${scope}/|^/+|/+$`, 'g');
  const parsedTab = router.asPath.replace(regex, '').split('/').shift();
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
    <nav className="markdown__navi">
      <div className="markdown__link">
        <Link href={data.root.link}>
          <a className="m">
            <strong>{data.root.label}</strong>
          </a>
        </Link>
      </div>
      <ul className="markdown__list">
        {data.navi.map((item) => {
          const isActiveToggle = (active[item.path] ? true : false);
          const subClasses = {
            'markdown__sublist': true,
            'active': isActiveToggle,
          };

          return (
            <li key={nanoid()} className="markdown__item">
              <div className="m markdown__label" onClick={() => handleToggle(item.path)}>
                {isActiveToggle ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
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
                    <li key={nanoid()} className="markdown__subitem">
                      <Link href={`/${scope}/${item.path}/${page.path}`}>
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

export default function Markdown({scope, data, docs}) {
  return (
    <div className="markdown">
      <div className="wrap markdown__wrap">
        <MarkdownSidebar scope={scope} data={data} />
        <TextLayout data={docs} name={scope} />
      </div>
    </div>
  );
}