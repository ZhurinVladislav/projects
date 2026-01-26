import Image from 'next/image';
import SearchBar from '../SearchBar';

const Hero = () => {
  return (
    <section className="section min-h-screen w-full overflow-hidden pt-87 max-lg:min-h-175 max-md:min-h-150 max-sm:min-h-125">
      <Image className="absolute inset-0 h-full w-full object-cover" src="/img/home/hero/bg-img.jpg" alt="Hero background" width={1920} height={942} />

      <div className="container flex h-full flex-col items-center">
        <div className="mb-22 text-white">
          <h1 className="title-1 mb-6 text-center">
            Только избранные дома для вашего
            <span className="color"> идеального </span>
            путешествия
          </h1>
          <p className="text-center text-2xl font-normal max-lg:text-xl max-md:text-lg max-sm:text-base">Каждый дом отобран вручную. Мы оставили только лучшее — для вас.</p>
        </div>

        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;
