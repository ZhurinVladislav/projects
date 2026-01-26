import Image from 'next/image';

const OurStory = () => {
  return (
    <section className="section bg-(--light-bg-color) py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <h2 className="title-2">
          Как всё <span className="color">началось</span>
        </h2>

        <div className="flex items-center gap-16 max-lg:flex-col-reverse max-lg:gap-8">
          {/* Left Image */}
          <div className="shrink-0 max-lg:w-full">
            <Image className="h-96 w-full max-w-126.25 rounded object-cover max-lg:max-w-full" src="/img/about/story/img-1.jpg" alt="История компании" width={505} height={384} />
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <p className="mb-4 text-lg font-normal max-md:text-base">
              Всё началось с простой идеи: путешествия должны быть не просто удобными, а по-настоящему вдохновляющими. Мы устали от бесконечных поисков среди сотен одинаковых квартир, неожиданных сюрпризов при заселении и отсутствия поддержки.
            </p>

            <p className="mb-4 text-lg font-normal max-md:text-base">
              Так появился TravelGrande — сервис, где каждый дом отобран вручную, а каждая деталь продумана. Мы сами любим путешествовать и знаем, как важно чувствовать себя как дома, даже находясь далеко от него.
            </p>

            <p className="mb-4 text-lg font-normal max-md:text-base">
              Сегодня наша коллекция включает более 150 эксклюзивных объектов в России и за рубежом. Каждый из них прошёл строгий отбор, и мы продолжаем расти, сохраняя высокие стандарты качества.
            </p>

            <p className="text-lg font-normal max-md:text-base">Присоединяйтесь к тысячам путешественников, которые уже доверяют нам свои поездки.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
