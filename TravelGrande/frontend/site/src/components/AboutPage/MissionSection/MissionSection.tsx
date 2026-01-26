import { SITE } from '@/config/site.config';
import Image from 'next/image';

const MissionSection = () => {
  return (
    <section className="section py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <div className="flex items-center gap-16 max-lg:flex-col max-lg:gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="mb-6 max-w-179.5 font-[--font-primary] text-[40px] leading-normal font-normal uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">
              Наша <span className="color">миссия</span>
            </h2>

            <p className="mb-4 max-w-206.5 text-lg font-normal max-md:text-base">
              {SITE.APP_NAME} — это не просто сервис бронирования. Это тщательно подобранная коллекция домов и апартаментов в самых красивых уголках России и за её пределами.
            </p>

            <p className="mb-4 max-w-206.5 text-lg font-normal max-md:text-base">
              Мы верим, что место, где вы остановитесь, должно быть частью вашего путешествия — вдохновлять, удивлять и оставлять тёплые воспоминания. Поэтому мы лично проверяем каждый объект, отбираем только лучшее и работаем напрямую с владельцами.
            </p>

            <p className="max-w-206.5 text-lg font-normal max-md:text-base">Никаких компромиссов. Только дома, в которые мы бы поехали сами.</p>
          </div>

          {/* Right Image */}
          <div className="shrink-0 max-lg:w-full">
            <Image className="h-96 w-full max-w-126.25 rounded object-cover max-lg:max-w-full" src="/img/about/mission/img-1.jpg" alt="Наша миссия" width={505} height={384} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
