import Layout from '../components/layout';
import { Hero, Icon, H5, P } from '../components/jambonz-ui';
import { getData } from '../lib/data';
import { nanoid } from 'nanoid';

function Facts({data}) {
  return (
    <div className="bg-pink facts">
      <div className="wrap facts__wrap">
        {data.map((fact) => {
          return (
            <div key={nanoid()} className="facts__item">
              <Icon name={fact.icon} style="fill" />
              <div className="facts__text">
                <H5><strong>{fact.title}</strong></H5>
                <P>{fact.text}</P>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Why({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.why.hero} subStyle="why" />
      <Facts data={data.why.facts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('why');

  return {
    props: {
      data,
    },
  };
}
