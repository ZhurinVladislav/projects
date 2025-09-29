interface IProps {
  title?: string;
  content: string;
}

const PageContent: React.FC<IProps> = props => {
  const { title, content } = props;

  if (content === '' || !content || content === null) {
    return <></>;
  }

  return (
    <section data-testid="page-content" className="section-content section">
      <div className="section-content__container container">
        {title !== '' && <h1 className="section-content__title title-1">{title}</h1>}
        <div className="section-content__content content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
};

export default PageContent;
