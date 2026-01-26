import Image from 'next/image';

const CollectedBest = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6 text-center font-[--font-primary] text-[40px] uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">
          Собрали лучшее — чтобы вы <span className="color">не тратили</span> время
        </h2>
        <p className="mb-16 text-center text-lg max-md:mb-8 max-md:text-base">Мы отобрали топ-жильё по качеству, комфорту и локации — вам остаётся только выбрать</p>

        <div className="flex flex-col gap-8">
          {/* First Section - Text Left, Image Right */}
          <div className="flex gap-3.5 max-md:flex-col-reverse">
            <div className="flex flex-1 flex-col">
              <p>
                Аренда жилья в Сочи — только лучшие варианты из доступных Если вы ищете комфортное жильё в Сочи для отпуска, выходных или длительного отдыха — вы на правильной странице. Мы собрали
                лучшие дома, квартиры и виллы в Сочи, которые действительно можно забронировать онлайн. Это не просто красивые фотографии — это проверенные объекты с честным описанием, удобным
                расположением и реальными отзывами гостей.
              </p>
              <p>
                Каждое жильё проходит ручную проверку по более чем 150 критериям: от чистоты и качества ремонта до уровня сервиса и безопасности. Мы не размещаем посредственные варианты, не работаем с
                недобросовестными хозяевами и отказываем тем, кто не готов соблюдать стандарты. В результате — только достойное жильё, в которое приятно возвращаться после пляжа, прогулок и экскурсий.
              </p>
            </div>
            <div className="h-72.25 w-full max-w-110 shrink-0 rounded max-md:max-w-full">
              <Image className="h-full w-full rounded object-cover" src="/img/city/collected-best/img-1.jpg" width={440} height={289} alt="Здание" />
            </div>
          </div>

          {/* Second Section - Checklist */}
          <div className="flex gap-3.5 max-md:flex-col">
            <div className="h-71 w-full max-w-110 shrink-0 rounded max-md:max-w-full">
              <Image className="h-full w-full rounded object-cover" src="/img/city/collected-best/img-2.jpg" width={440} height={284} alt="Интерьер" />
            </div>

            <div className="content flex flex-1 flex-col">
              <h3>Почему аренда жилья в Сочи через наш сайт — это удобно:</h3>
              <ul>
                <li>Только проверенные квартиры и дома у моря, в центре города, на Красной Поляне и в других районах</li>
                <li>Прямой контакт с хозяевами, без скрытых комиссий</li>
                <li>Актуальные цены и даты — вы видите только те варианты, которые реально доступны</li>
                <li>Поддержка на всех этапах — от выбора до заселения</li>
                <li>Удобная фильтрация по типу жилья, количеству гостей и бюджету</li>
              </ul>
            </div>
          </div>

          <p>
            Сочи — это не только лето и море. Курорт популярен круглый год: для зимнего отдыха, горных прогулок, санаториев, бизнес-поездок и романтических уикендов. Здесь вы найдёте всё: от стильных
            студий у пляжа до просторных домов с бассейном и видом на горы.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollectedBest;
