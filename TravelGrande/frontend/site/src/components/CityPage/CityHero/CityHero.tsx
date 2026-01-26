import { SITE } from '@/config/site.config';
import Image from 'next/image';

interface Reason {
  number: number;
  text: string;
}

interface CityHeroProps {
  cityName: string;
  subtitle: string;
  reasons: Reason[];
  description: string;
  imageUrl: string;
}

const CityHero = ({ cityName, subtitle, reasons, description, imageUrl }: CityHeroProps) => {
  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 flex gap-4.5 max-lg:mb-0 max-lg:flex-col">
          <div className="flex w-full max-w-202 flex-1 flex-col gap-6 max-lg:order-2 max-lg:py-12 max-md:py-8">
            <h1 className="max-w-151.75 font-[--font-primary] text-[40px] text-(--text-color) uppercase max-md:text-3xl max-sm:text-2xl">
              {cityName} — {subtitle}
            </h1>
            <p className="mb-16 max-lg:mb-4">{description}</p>

            <div>
              <h3 className="mb-8 text-xl">Почему выбираете {cityName}?</h3>

              <ul className="flex flex-col gap-4">
                {reasons.map(reason => (
                  <li key={reason.number} className="flex items-start gap-3">
                    <Image src="/img/logo-small.svg" width={32} height={32} alt={`Логотип ${SITE.APP_NAME}`} />
                    <p>{reason.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-120.25 w-full max-w-133.5 shrink-0 overflow-hidden rounded max-lg:order-1 max-lg:max-w-full max-md:h-87.5">
            <Image className="h-full w-full object-cover" src={imageUrl} alt={cityName} width="534" height="481" priority />
          </div>
        </div>

        <p className="text-lg text-(--secondary-color)">Начните планировать идеальный отпуск — вдохновляйтесь, выбирайте и бронируйте лучшие дома в {cityName}!</p>
      </div>
    </section>
  );
};

export default CityHero;
