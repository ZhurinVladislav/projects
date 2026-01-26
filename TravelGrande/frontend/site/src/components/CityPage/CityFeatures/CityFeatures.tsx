import Image from 'next/image';

interface CityFeaturesProps {
  cityName: string;
  subtitle: string;
  description: string;
}

const CityFeatures = ({ cityName, subtitle, description }: CityFeaturesProps) => {
  return (
    <section className="section bg-(--light-bg-color) py-16 max-md:py-10">
      <Image className="absolute top-2/4 left-9 transform-[translateY(-50%)]" src="/img/city/city-features/decor.svg" width="332" height="318" alt="Декор" />

      <div className="container">
        <h2 className="mb-6 text-center font-[--font-primary] text-[40px] text-(--primary-color) uppercase max-md:text-3xl max-sm:text-2xl">Особенности отдыха в {cityName}</h2>
        <p className="mb-10 text-center text-lg max-md:mb-8 max-md:text-base">{subtitle}</p>

        <p className="m-auto w-full max-w-206.5 text-center">{description}</p>
      </div>

      <Image className="absolute top-2/4 right-9 transform-[translateY(-50%)] max-md:hidden" src="/img/city/city-features/decor.svg" width="332" height="318" alt="Декор" />
    </section>
  );
};

export default CityFeatures;
