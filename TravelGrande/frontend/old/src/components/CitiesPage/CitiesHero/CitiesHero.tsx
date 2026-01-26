import DestinationsGrid from '../DestinationsGrid';

const CitiesHero = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto mb-16 flex max-w-270 flex-col items-center justify-center gap-6 text-center">
          <h1 className="font-[--font-primary] text-[40px] uppercase max-md:text-4xl max-sm:text-3xl">
            Найдите своё <span className="color">идеальное</span> место для отдыха
          </h1>
          <p className="text-lg max-md:text-base">
            Выбирайте из проверенных направлений — от Черноморского побережья до горных курортов и столиц. Мы лично отобрали жильё в каждом городе, чтобы отдых был без сюрпризов.
          </p>
        </div>

        <DestinationsGrid />
      </div>
    </section>
  );
};

export default CitiesHero;
