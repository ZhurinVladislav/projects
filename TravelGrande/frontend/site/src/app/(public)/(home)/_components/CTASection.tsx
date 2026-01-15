import { PAGES } from '@/config/pages.config';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section
      className="relative mb-20 flex min-h-[524px] w-full items-center justify-center overflow-hidden py-[120px] max-md:mb-16 max-md:py-20 max-sm:mb-12 max-sm:py-12"
      style={{
        backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/7013eb241b7f5564164a865ca9ee51658dc4a406?width=3840')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-[751px] flex-col items-center gap-16 max-md:gap-12 max-sm:gap-8">
          <div className="flex flex-col items-start gap-6 max-md:gap-4">
            <h2 className="w-full text-center font-['Times_New_Roman'] text-[40px] leading-normal font-normal text-white uppercase max-md:text-3xl max-sm:text-2xl">
              Начните планировать идеальное путешествие <span className="text-[#C8AC71]">уже сегодня</span>
            </h2>
            <p className="w-full text-center font-['Open_Sans'] text-lg font-normal text-white max-md:text-base">
              Найдите дом, который станет частью вашего отдыха. Проверенные варианты, ручной отбор, только лучшее.
            </p>
          </div>

          <Link href={PAGES.PROPERTIES} className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-[51px] py-4 transition-opacity hover:opacity-90">
            <span className="text-center font-['Open_Sans'] text-base font-semibold text-[#2B2A29]">К объектам</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
