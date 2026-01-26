import Image from 'next/image';

const TravelGuide = () => {
  return (
    <section className="section overflow-hidden bg-(--light-bg-color) py-16 max-md:py-10">
      <Image className="absolute top-2/4 left-0 transform-[translateY(-50%)]" src="/img/cities/travel-guide/decor.svg" width="220" height="296" alt="Декор" />
      <div className="container">
        <div className="flex gap-10 max-md:flex-col">
          <div className="flex w-full max-w-206.5 flex-col">
            <h2 className="mb-6 font-[--font-primary] text-[40px] text-(--primary-color) uppercase max-md:text-3xl max-sm:text-2xl">Наш подход</h2>
            <p className="mb-10 text-lg max-md:mb-6 max-md:text-base">Почему стоит бронировать у нас?</p>
            <p className="mb-16 text-lg max-md:mb-6 max-md:text-base">
              Мы не размещаем всё подряд — только тщательно отобранные дома, честные фото, доброжелательные хозяева и надёжная поддержка. Каждое направление мы прорабатываем, как для себя.
            </p>

            <ul className="grid auto-rows-[50px] grid-cols-2 gap-5 max-md:grid-cols-1">
              <li className="flex items-center justify-center gap-3 rounded-xs border border-(--secondary-color) p-1 font-semibold text-(--secondary-color)">
                <Image src="/img/icons/shield.svg" width={16} height={16} alt="Щит" />
                <p>Только проверенное жильё</p>
              </li>
              <li className="flex items-center justify-center gap-3 rounded-xs border border-(--secondary-color) p-1 font-semibold text-(--secondary-color)">
                <Image src="/img/icons/flower.svg" width={16} height={16} alt="Цветок" />
                <p>Вдохновляющий контент</p>
              </li>
              <li className="flex items-center justify-center gap-3 rounded-xs border border-(--secondary-color) p-1 font-semibold text-(--secondary-color)">
                <Image src="/img/icons/praying-hand.svg" width={16} height={16} alt="Хлопок ладонями" />
                <p>Помощь в выборе</p>
              </li>
              <li className="flex items-center justify-center gap-3 rounded-xs border border-(--secondary-color) p-1 font-semibold text-(--secondary-color)">
                <Image src="/img/icons/ai-edit-spark.svg" width={16} height={16} alt="Карандаш" />
                <p>Простое и честное бронирование</p>
              </li>
            </ul>
          </div>
          <Image className="overflow-hidden rounded-sm" src="/img/cities/travel-guide/img-1.jpg" width="494" height="363" alt="Интерьер" />
        </div>
      </div>
    </section>
  );
};

export default TravelGuide;
