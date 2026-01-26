import { PAGES } from '@/config/pages.config';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section
      className="section flex min-h-131 w-full items-center justify-center overflow-hidden py-30 max-md:mb-16 max-md:py-20 max-sm:mb-12 max-sm:py-12"
      style={{
        backgroundImage: "url('img/home/cta-section/bg-img.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="container">
        <div className="mx-auto flex max-w-187.75 flex-col items-center gap-16 max-md:gap-12 max-sm:gap-8">
          <div className="flex flex-col items-start gap-6 max-md:gap-4">
            <h2 className="w-full text-center font-[--font-primary] text-[40px] leading-normal font-normal text-white uppercase max-md:text-3xl max-sm:text-2xl">
              Начните планировать идеальное путешествие <span className="color">уже сегодня</span>
            </h2>
            <p className="w-full text-center text-lg font-normal text-white max-md:text-base">Найдите дом, который станет частью вашего отдыха. Проверенные варианты, ручной отбор, только лучшее.</p>
          </div>

          <Link href={PAGES.OBJECTS} className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-12.75 py-4 transition-opacity hover:opacity-90">
            <span className="text-center text-base font-semibold">К объектам</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
