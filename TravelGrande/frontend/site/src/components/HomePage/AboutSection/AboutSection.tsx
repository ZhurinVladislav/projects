import { SITE } from '@/config/site.config';
import Image from 'next/image';
import { AnimateOnView } from '@/shared/components/AnimateOnView';

const AboutSection = () => {
  return (
    <section className="section mb-20 w-full overflow-hidden bg-(--light-bg-color) py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <div className="flex items-center gap-16 max-lg:flex-col max-lg:gap-8">
          {/* Left Content */}
          <AnimateOnView animation="slide-right" className="flex-1">
            {/* Logo Icon */}
            <Image src="/img/home/about-section/logo.svg" width={55} height={53} className="mb-12 fill-(--primary-color) max-md:mb-8" alt={`Логотип ${SITE.APP_NAME}`} />

            <h2 className="mb-6 max-w-179.5 font-[--font-primary] text-[40px] leading-normal font-normal uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">
              TravelGrande — это не просто каталог домов.
            </h2>

            <p className="mb-4 max-w-206.5 text-lg font-normal max-md:text-base">
              Мы верим, что дом для путешествия должен вдохновлять.Он должен быть уютным, красивым, с характером — таким, чтобы туда хотелось вернуться.
            </p>

            <p className="max-w-206.5 text-lg font-normal max-md:text-base">
              Мы лично отбираем каждый объект: по стилю, комфорту, атмосфере и деталям.Никаких случайных квартир, посредников или компромиссов. Только дома, в которые мы бы поехали сами.
            </p>
          </AnimateOnView>

          {/* Right Image */}
          <AnimateOnView animation="slide-left" delay={100} className="shrink-0 max-lg:w-full">
            <Image className="h-64.25 w-full max-w-126.25 rounded object-cover max-lg:max-w-full" src="/img/home/about-section/img-1.jpg" alt="Interior" width={505} height={257} />
          </AnimateOnView>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
