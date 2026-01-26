interface IProps {
  content: string | null;
}

const HomeContent: React.FC<IProps> = props => {
  const { content } = props;

  return (
    <section data-testid="home-content" className="section">
      <div className="container">
        <div className="mb-12 rounded-4xl bg-[url(/img/home/content/bg-img.jpg)] bg-cover bg-center bg-no-repeat p-[36px_38px]">
          <div className="max-w-236 rounded-2xl bg-white p-7.5">
            <h2 className="font-tenor-sans mb-10 text-[40px] leading-none max-md:text-4xl max-sm:text-3xl">Лучшие и проверенные агентства недвижимости по версии GetRealt.ru</h2>
            <div className="content">
              <p>Добро пожаловать на сайт, где представлен актуальный рейтинг лучших агентств недвижимости!</p>
              <p>
                Здесь вы найдете подробную информацию о самых надежных и успешных компаниях, работающих в данной сфере. Мы составили данный рейтинг на основе тщательного анализа деятельности агентств,
                их репутации, отзывов клиентов и многих других факторов.
              </p>
              <p>
                Наши эксперты регулярно отслеживают последние тенденции и изменения на рынке недвижимости, чтобы предоставить вам наиболее полную и объективную картину. Выбирайте лучшее агентство
                вместе с нами!
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-8">
            Наш ресурс создан специально для тех, кто ищет надежных партнеров в сфере недвижимости. Мы понимаем, насколько важно найти достойное риэлторское агентство, которое поможет вам реализовать
            ваши планы, будь то покупка, продажа или аренда недвижимости.
          </p>
          {content && <div className="content" dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
