import Layout from '../components/layout';
import { Hero, Icon, P } from '../components/jambonz-ui';
import { getData } from '../lib/data';
import { nanoid } from 'nanoid';

function Touts({data}) {
  return (
    <div className="bg-pink touts">
      <div className="wrap touts__wrap">
        {data.map((tout) => {
          return (
            <div key={nanoid()} className="touts__item">
              <Icon name={tout.icon} style="fill" subStyle={tout.color} />
              <P>{tout.text}</P>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Pricing({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.pricing.hero} subStyle="pricing" />
      <Touts data={data.pricing.touts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData('pricing');

  return {
    props: {
      data,
    },
  };
}
