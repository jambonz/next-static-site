import { nanoid } from 'nanoid';
import Layout from '../components/layout';
import { Hero, H6, MS } from '../components/jambonz-ui';
import { getData } from '../lib/data';

export default function Home({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.home.hero} subStyle="home" />
      <div className="tech wrap">
        <div className="tech__image">
          <img src={data.home.tech.image} />
        </div>
        <ul className="tech__notes">
          {data.home.tech.notes.map((note) => {
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
