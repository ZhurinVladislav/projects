import Image from 'next/image';

const WhySection = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="title-2">
          Почему <span className="color">TravelGrande</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-5 max-sm:flex-col">
          {/* Feature 1 */}
          <div className="flex min-h-16.25 flex-1 items-center justify-center gap-3 overflow-hidden rounded border border-(--border) bg-white px-8 py-3 max-lg:min-w-70 max-sm:w-full max-sm:min-w-0">
            <Image src="img/home/why-section/icon-1.svg" width={22} height={25} alt="Щит" />
            <p className="text-center text-lg max-md:text-base">Только проверенные объекты</p>
          </div>
          {/* Feature 2 */}
          <div className="flex min-h-16.25 flex-1 items-center justify-center gap-3 overflow-hidden rounded border border-(--border) bg-white px-8 py-3 max-lg:min-w-70 max-sm:w-full max-sm:min-w-0">
            <Image src="img/home/why-section/icon-2.svg" width={28} height={25} alt="Рукопожатие" />
            <p className="text-center text-lg max-md:text-base">Без посредников</p>
          </div>
          {/* Feature 3 */}
          <div className="flex min-h-16.25 flex-1 items-center justify-center gap-3 overflow-hidden rounded border border-(--border) bg-white px-8 py-3 max-lg:min-w-70 max-sm:w-full max-sm:min-w-0">
            <Image src="img/home/why-section/icon-3.svg" width={29} height={26} alt="Алмаз" />
            <p className="text-center text-lg max-md:text-base">Эксклюзивные объекты</p>
          </div>

          {/* Feature 4 */}
          <div className="flex min-h-16.25 flex-1 items-center justify-center gap-3 overflow-hidden rounded border border-(--border) bg-white px-8 py-3 max-lg:min-w-70 max-sm:w-full max-sm:min-w-0">
            <Image src="img/home/why-section/icon-4.svg" width={29} height={26} alt="Алмаз" />
            <p className="text-center text-lg max-md:text-base">Красивее, чем в Instagram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
