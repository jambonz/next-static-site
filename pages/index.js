import { nanoid } from 'nanoid';
import classNames from 'classnames';
import Layout from '../components/layout';
import { Hero, Icon, Button, H6, H5, H2, P, MS, normalizeSubtext, normalizeSlug, useMobileMedia } from '../components/jambonz-ui';
import { getData } from '../lib/data';
import { useState, useEffect, useRef } from 'react';

function Tech({data}) {
  return (
    <div className="tech wrap">
      <div className="tech__image">
        <img src={data.image} />
      </div>
      <ul className="tech__notes">
        {data.notes.map((note) => {
          return (
            <li key={nanoid()} className="tech__note">
              <H6>
                <strong>{note.title}</strong>
              </H6>
              <MS>{note.text}</MS>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Dilemma({data}) {
  const mobile = useMobileMedia();
  const initialRef = useRef();
  const [active, setActive] = useState(null);

  const handleToggle = (e) => {
    const toggleData = e.target.dataset;

    if (toggleData.key === active) {
      setActive(null);

    } else {
      setActive(toggleData.key);
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
    <div className="bg-grey dilemma pad">
      <div className="wrap dilemma__wrap">
        <div className="dilemma__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="dilemma__subtext">
          <H5>
            {normalizeSubtext(data.subtext).map((subtext) => {
              {/* Use dangerouslySetInnerHTML to render inline spans from YAML data */}
              return <div key={nanoid()} dangerouslySetInnerHTML={{ __html: subtext }} />;
            })}
          </H5>
        </div>
        <div className="dilemma__tables">
          {data.tables.map((table) => {
            const classes = {
              'dilemma__table': true,
              'dilemma__table--jambonz': table.logo ? true : false,
            };
            const slug = normalizeSlug(table.title);
            const isActiveToggle = (active === slug);
            const pointsClasses = {
              'dilemma__table__points': true,
              'active': isActiveToggle,
            };

            return (
              <div key={slug} className={classNames(classes)}>
                <div className="dilemma__table__title">
                  {table.logo ? <img src={table.logo} /> : <P><strong>{table.title}</strong></P>}
                  <span data-key={slug} className="dilemma__table__toggle" onClick={handleToggle}>
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
    </div>
  );
}

function BYO({data}) {
  return (
    <div className="byo pad">
      <div className="wrap byo__wrap">
        <div className="byo__headline">
          <H2>{data.headline}</H2>
        </div>
        <div className="byo__subtext">
          <H5>{data.subtext}</H5>
        </div>
        <div className="byo__icons icons">
          {data.icons.map((icon) => {
            return <Icon key={nanoid()} name={icon} style="fill" />
          })}
        </div>
        <div className="byo__comment">
          <H5>
            {/* Use dangerouslySetInnerHTML to render inline link from YAML data */}
            <div dangerouslySetInnerHTML={{ __html: data.comment }} />
          </H5>
        </div>
        <div className="byo__cta">
          <Button href={data.url} subStyle="dark" target="_blank">{data.cta}</Button>
        </div>
      </div>
    </div>
  );
}

export default function Home({ data }) {
  return (
    <Layout siteData={data.site}>
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
