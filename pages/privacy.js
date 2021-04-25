import { nanoid } from "nanoid";
import Layout from "../components/layout";
import { Hero } from "../components/jambonz-ui";
import { getData } from "../lib/data";

export const Contents = ({ data }) => {
  const getListStyle = (format) => {
    let style = "none";

    switch (format) {
      case "number":
        style = "decimal";
        break;
      case "circle":
        style = "disc";
        break;
      default:
    }

    return style;
  };

  return (
    <section className="privacy__content">
      {data.map((item) => (
        <div className="privacy__content__item" key={nanoid()}>
          {item.title ? <h4>{item.title}</h4> : ""}
          <ul style={{ listStyle: getListStyle(item.format) }}>
            {item.text.map((iText) =>
              typeof iText === "object" ? (
                <ul style={{ listStyle: getListStyle(iText.format) }} key={nanoid()}>
                  {iText.text.map((subText) => (
                    <li key={nanoid()}>
                      <p>{subText}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <li key={nanoid()}>
                  <p dangerouslySetInnerHTML={{ __html: iText }} />
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default function Privacy({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.privacy.hero} subStyle="privacy" />
      <Contents data={data.privacy.contents} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData("privacy");

  return {
    props: {
      data,
    },
  };
}
