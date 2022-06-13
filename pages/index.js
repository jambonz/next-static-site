import { nanoid } from 'nanoid';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';

import Layout from '../src/components/layout';
import { Latest, Hero, Icon, Button, H4, H3, H2, P, MS, normalizeSubtext, normalizeSlug, useMobileMedia } from '../src/components/jambonz-ui';
import { getData } from '../src/lib/data';

function Tech({ data }) {
  return (
    <section className="tech wrap">
      <div className="tech__image">
        <img
          src={data.image.src}
          srcSet={`${data.image.src} 2x, ${data.image.src2} 1.5x`}
          width={data.image.width}
          height={data.image.height}
          alt={data.image.alt}
        />
      </div>
      <ul className="tech__notes">
        {data.notes.map((note) => {
          return (
            <li key={nanoid()} className="tech__note">
              <P className="h6">
                <strong>{note.title}</strong>
              </P>
              <MS>{note.text}</MS>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Dilemma({ data }) {
  const mobile = useMobileMedia();
  const initialRef = useRef();
  const [active, setActive] = useState(null);

  const handleToggle = (slug) => {
    if (!mobile) {
      return;
    }

    if (slug === active) {
      setActive(null);

    } else {
      setActive(slug);
    }
  };

  // Make sure jambonz is the default open toggle on mobile...
  useEffect(() => {
    if (mobile && !active && !initialRef.current) {
      initialRef.current = true;
      setActive('jambonz');
    }
  }, [mobile, active, setActive, initialRef]);

  return (
    <section className="bg-grey dilemma pad">
      <div className="wrap dilemma__wrap">
        <div className="dilemma__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="dilemma__subtext">
          <H3 className="h5">
            {/* Use dangerouslySetInnerHTML to render inline spans from YAML data */}
            {normalizeSubtext(data.subtext).map((subtext) => <div key={nanoid()} dangerouslySetInnerHTML={{ __html: subtext }} />)}
          </H3>
        </div>
        <div className="dilemma__tables">
          {data.tables.map((table) => {
            const slug = normalizeSlug(table.title);
            const isActiveToggle = (active === slug);
            const isTableLogo = (table.logo ? true : false);
            const tableClasses = {
              'dilemma__table': true,
              'dilemma__table--jambonz': isTableLogo,
            };
            const pointsClasses = {
              'dilemma__table__points': true,
              'active': isActiveToggle,
            };

            return (
              <div key={slug} className={classNames(tableClasses)}>
                <div className="dilemma__table__title" onClick={() => handleToggle(slug)}>
                  {table.logo ? <img src={table.logo} width="128" height="42" alt="jambonz" /> : <P><strong>{table.title}</strong></P>}
                  <span className="dilemma__table__toggle" >
                    {isActiveToggle ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" />}
                  </span>
                </div>
                <div className={classNames(pointsClasses)}>
                  {table.points.map((point) => {
                    const classes = {
                      'dilemma__table__point': true,
                      [point.icon.toLowerCase()]: true,
                    };

                    return (
                      <div key={nanoid()} className={classNames(classes)}>
                        <Icon name={point.icon} />
                        <MS>
                          {normalizeSubtext(point.text).map((text) => {
                            return <div key={nanoid()}>{text}</div>;
                          })}
                        </MS>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BYO({ data }) {
  return (
    <section className="byo pad">
      <div className="wrap byo__wrap">
        <div className="byo__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="byo__subtext">
          <H3 className="h5">{data.subtext}</H3>
        </div>
        <div className="byo__icons icons">
          {data.icons.map((icon) => {
            return <Icon key={nanoid()} name={icon} mainStyle="fill" />;
          })}
        </div>
        <div className="byo__comment">
          <H4 className="h5">
            {/* Use dangerouslySetInnerHTML to render inline link from YAML data */}
            <div dangerouslySetInnerHTML={{ __html: data.comment }} />
          </H4>
        </div>
        <div className="byo__cta">
          <Button href={data.url} subStyle="dark">{data.cta}</Button>
        </div>
      </div>
    </section>
  );
}

export default function Home({ data }) {
  const latest = data.site.latest.find((item) => item.active);
  
  return (
    <Layout siteData={data.site}>
      {latest && <Latest data={latest} />}
      <Hero data={data.home.hero} subStyle="home" />
      <Tech data={data.home.tech} />
      <Dilemma data={data.home.dilemma} />
      <BYO data={data.home.byo} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('home');

  return {
    props: {
      data,
    },
  };
}
