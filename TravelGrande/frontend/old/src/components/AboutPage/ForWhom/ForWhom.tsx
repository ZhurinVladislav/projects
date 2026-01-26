import Image from 'next/image';

const ForWhom = () => {
  const audiences = [
    {
      id: 1,
      text: 'Для тех, кто ценит качество и комфорт, а не просто «переночевать».',
    },
    {
      id: 2,
      text: 'Для семей, пар, фрилансеров и путешественников.',
    },
    {
      id: 3,
      text: 'Для тех, кто ищет что-то особенное, а не первую попавшуюся квартиру.',
    },
    {
      id: 4,
      text: 'Для тех, кто не хочет тратить часы на поиски — потому что мы уже всё отобрали.',
    },
  ];

  return (
    <section className="section-color">
      <Image className="absolute top-2/4 left-0 transform-[translateY(-50%)]" src="/img/cities/travel-guide/decor.svg" width="220" height="296" alt="Декор" />
      <div className="container">
        <div className="flex items-start gap-16 max-lg:flex-col-reverse max-lg:gap-10">
          {/* Left - Audience List */}
          <div className="flex w-full max-w-192.5 flex-col">
            <h2 className="title-2-inner text-(--primary-color)">Для кого мы?</h2>
            <ul className="flex flex-col gap-8.5 max-md:gap-6">
              {audiences.map(audience => (
                <li key={audience.id} className="flex gap-3">
                  <div className="h-7.5 w-7.5 shrink-0">
                    <Image src="/img/logo-small.svg" alt="" width={30} height={30} className="h-full w-full" />
                  </div>
                  <p>{audience.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Image */}
          <div className="w-full max-w-126.25 shrink-0 overflow-hidden rounded max-lg:max-w-full">
            <Image className="h-auto w-full object-cover" src="/img/about/for-whom/img-1.jpg" width={505} height={553} alt="Дом" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
