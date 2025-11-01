import img from '@/assets/img/home/hero/img-1.png';
import Image from 'next/image';

const HomeHero = () => {
  return (
    <section data-testid="home-hero" className="section">
      <div className="container">
        <div className="mb-30 flex justify-between gap-3 max-md:flex-col-reverse max-sm:mb-20">
          <div className="flex flex-col">
            <h1 className="title-1">Рейтинг агентств недвижимости в России</h1>
            <p>Рейтинг лучших и проверенных риэлторских агентств</p>

            {/* <SearchForm typeEl="desc" /> */}
          </div>
          <Image src={img} className="flex h-full min-h-72 w-full max-w-127 min-w-100 object-fill max-sm:min-w-70" alt="Пейзаж с зданиями" />
        </div>

        <ul data-testid="stats-list" className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          <li className="card items-center justify-center text-center">
            <p className="font-tenor-sans text-[40px] max-md:text-4xl">1246</p>
            <p>Проверенных агентств недвижимости</p>
          </li>
          <li className="card items-center justify-center text-center">
            <p className="font-tenor-sans text-[40px] max-md:text-4xl">258</p>
            <p>Оказываемых услуг</p>
          </li>
          <li className="card items-center justify-center text-center">
            <p className="font-tenor-sans text-[40px] max-md:text-4xl">1680+</p>
            <p>Отзывов клиентов</p>
          </li>
          <li className="card items-center justify-center text-center">
            <p className="font-tenor-sans text-[40px] max-md:text-4xl">58 859+</p>
            <p>Посетителей в месяц</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomeHero;
