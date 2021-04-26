import { nanoid } from "nanoid";
import Layout from "../components/layout";
import { Hero } from "../components/jambonz-ui";
import { getData } from "../lib/data";
import React from "react";

const Heading = ({ data }) => {
  return (
    <div className="terms__heading">
      {data.map((item) => (
        <p
          key={nanoid()}
          className="terms__heading-pg"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </div>
  );
};

const Content = ({ data }) => {
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
    <div className="terms__content">
      <h5 className="terms__content-caption">TERMS AND CONDITIONS</h5>
      {data.map(({ title, text }) => (
        <React.Fragment key={nanoid()}>
          <h6 className="terms__content-title">{title}</h6>
          {text.map((item) => {
            return typeof item === "object" ? (
              <ul
                className="terms__content-list"
                key={nanoid()}
                style={{ listStyle: getListStyle(item.format) }}
              >
                {item.subText.map((iSubText) => (
                  <li key={nanoid()}>
                    <p className="terms__content-subtext">
                      {iSubText}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p key={nanoid()} className="terms__content-text">
                {item}
              </p>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function Terms({ data }) {
  return (
    <Layout siteData={data.site}>
      <Hero data={data.terms.hero} subStyle="terms" />
      <Heading data={data.terms.heading} />
      <Content data={data.terms.content} />
    </Layout>
  );
}

export async function getStaticProps() {
  const data = getData("terms");

  return {
    props: {
      data,
    },
  };
}
