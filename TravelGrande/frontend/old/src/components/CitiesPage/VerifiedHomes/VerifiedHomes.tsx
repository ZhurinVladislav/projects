import Image from 'next/image';

const VerifiedHomes = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-16 text-center font-[--font-primary] text-[40px] text-(--text-color) uppercase max-lg:mb-12 max-md:mb-8 max-md:text-3xl max-sm:text-2xl">
          От моря до гор — <span className="color">только проверенные дома</span>
        </h2>
        <div className="m-auto flex max-w-260.5 flex-col gap-16 max-lg:gap-12">
          {/* First Row */}
          <div className="flex gap-11 max-md:flex-col-reverse max-md:gap-8">
            <p>
              Ищете комфортное жильё для отдыха в России? На TravelGrande мы собрали лучшие дома и квартиры в самых популярных и уютных уголках страны — от солнечного побережья Черного моря до
              живописных горных курортов. Каждый объект проходит строгий отбор: мы проверяем качество, чистоту, удобства и доброжелательность хозяев, чтобы вы отдыхали без сюрпризов и лишних хлопот.
              Забронируйте проверенное жильё у моря, в горах или в тихом курортном посёлке и наслаждайтесь настоящим комфортом в путешествии.
            </p>
            <div className="h-95 w-full max-w-125 shrink-0 rounded max-md:max-w-full">
              <Image className="h-full w-full object-cover" src="/img/cities/verified-homes/img-1.jpg" width={500} height={380} alt="Интерьер" />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex gap-11 max-md:flex-col max-md:gap-8">
            <div className="h-95 w-full max-w-125 shrink-0 rounded max-md:max-w-full">
              <Image className="h-full w-full object-cover" src="/img/cities/verified-homes/img-2.jpg" width={500} height={380} alt="Интерьер" />
            </div>
            <p>
              Ищете комфортное жильё для отдыха в России? На TravelGrande мы собрали лучшие дома и квартиры в самых популярных и уютных уголках страны — от солнечного побережья Черного моря до
              живописных горных курортов. Каждый объект проходит строгий отбор: мы проверяем качество, чистоту, удобства и доброжелательность хозяев, чтобы вы отдыхали без сюрпризов и лишних хлопот.
              Забронируйте проверенное жильё у моря, в горах или в тихом курортном посёлке и наслаждайтесь настоящим комфортом в путешествии.
            </p>
          </div>

          {/* Third Row */}
          <div className="flex gap-11 max-md:flex-col-reverse max-md:gap-8">
            <p>
              Ищете комфортное жильё для отдыха в России? На TravelGrande мы собрали лучшие дома и квартиры в самых популярных и уютных уголках страны — от солнечного побережья Черного моря до
              живописных горных курортов. Каждый объект проходит строгий отбор: мы проверяем качество, чистоту, удобства и доброжелательность хозяев, чтобы вы отдыхали без сюрпризов и лишних хлопот.
              Забронируйте проверенное жильё у моря, в горах или в тихом курортном посёлке и наслаждайтесь настоящим комфортом в путешествии.
            </p>
            <div className="h-95 w-full max-w-125 shrink-0 rounded max-md:max-w-full">
              <Image className="h-full w-full object-cover" src="/img/cities/verified-homes/img-3.jpg" width={500} height={380} alt="Интерьер" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedHomes;
