export default function TextLayout({ data }) {
  return (
    <div className="text__layout">
      <div className="wrap text__layout__wrap">
        <div className="text__layout__html">
          <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
        </div>
      </div>
    </div>
  );
}
