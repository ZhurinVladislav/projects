import { SITE } from '@/config/site.config';

const AboutHero = () => {
  return (
    <section data-test-id="about-hero" className="section">
      <div className="container flex flex-col items-center justify-center text-center">
        <div className="title-block">
          <h1 className="title-block__title">
            <span className="color">Новые дома</span> в {SITE.APP_NAME}
          </h1>
          <p className="title-block__subtitle">Только лучшие дома и квартиры в России</p>
        </div>

        <div className="flex max-w-283.25 flex-col gap-6">
          <p>
            {SITE.APP_NAME} — это больше, чем сайт аренды. Это команда, которая вручную отбирает выдающееся жильё по всей России: от стильных квартир в центре Москвы до атмосферных коттеджей в Сочи и
            Калининграде.
          </p>
          <p>
            Мы проверяем каждый объект перед тем, как добавить его на сайт. Критерии — строгие, как у главного редактора журнала: дизайн, комфорт, инфраструктура, честный хозяин. В итоге в каталоге
            остаются только те дома, в которых мы с удовольствием остановились бы сами.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
