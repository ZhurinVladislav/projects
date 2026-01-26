import Image from 'next/image';

const WhyTravelGrande = () => {
  const reasons = [
    {
      id: 1,
      title: 'Ручной отбор',
      description: 'Ни одного случайного объекта — только жильё, которое прошло проверку на соответствие нашему чек-листу качества.',
    },
    {
      id: 2,
      title: 'Уникальные объекты',
      description: 'Дизайнерские квартиры, виллы у моря, дома с каминами, сауной и даже купелью.',
    },
    {
      id: 3,
      title: 'Прозрачность',
      description: 'Реальные цены, понятные условия, никакой путаницы.',
    },
    {
      id: 4,
      title: 'Никакого «жилья с фото 2015 года»',
      description: 'Все объекты актуальны, фото соответствуют реальности.',
    },
    {
      id: 5,
      title: 'Жильё по всей России',
      description: 'от Камчатки до Балтики.',
    },
  ];

  return (
    <section className="section-color">
      <div className="container">
        <div className="flex justify-between gap-21.5 max-lg:flex-col max-lg:gap-10">
          {/* Left - Reasons List */}
          <div className="flex w-full max-w-192.5 flex-col">
            <h2 className="title-2-inner text-(--primary-color)">Почему TravelGrande?</h2>

            <ul className="flex flex-col gap-8.5 max-md:gap-6">
              {reasons.map(reason => (
                <li key={reason.id} className="flex gap-3">
                  <div className="h-7.5 w-7.5 shrink-0">
                    <Image src="/img/logo-small.svg" alt="" width={30} height={30} className="h-full w-full" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-xl font-semibold max-md:text-lg">{reason.title}</p>
                    <p>{reason.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Image */}
          <div className="w-full max-w-126.25 shrink-0 overflow-hidden rounded max-lg:max-w-full">
            <Image className="h-auto w-full object-cover" src="/img/about/why/img-1.jpg" alt="Интерьер" width={505} height={553} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTravelGrande;
