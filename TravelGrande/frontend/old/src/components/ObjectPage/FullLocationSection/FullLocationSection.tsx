import Image from 'next/image';

const FullLocationSection = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="border-b border-(--border-color) pb-8">
          <h2 className="mb-6 text-2xl">Расположение</h2>

          {/* Map placeholder */}
          <div className="mb-8 h-112.5 w-full rounded-sm bg-linear-to-br from-green-100 to-blue-100">
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-600">Карта расположения</p>
            </div>
          </div>

          {/* Transport/Shops/Points of Interest */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-8 text-xl font-semibold">Транспорт</h3>
              <div className="space-y-4">
                {[
                  { name: 'Аэропорт Адлер', time: '2ч. 10 мин' },
                  { name: 'ЖД Сочи', time: '40 мин' },
                  { name: 'Автовокзал', time: '55 мин' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-sm border border-[#D9D9D9] p-4">
                    <span className="text-base">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <Image src="/img/icons/car.svg" width={20} height={20} alt="Машина" />
                      <span className="text-base text-(--secondary-color)">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-semibold">Магазины и кафе</h3>
              <div className="space-y-4">
                {[
                  { name: 'Продукты', time: '3 мин', walk: true },
                  { name: 'Аптека', time: '10 мин', walk: true },
                  { name: 'Кафе', time: '10 мин', walk: true },
                  { name: 'ТЦ Сити', time: '10 мин', walk: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-sm border border-[#D9D9D9] p-4">
                    <span className="text-base">{item.name}</span>
                    <div className="flex items-center gap-3">
                      {item.walk ? <Image src="/img/icons/man.svg" width={20} height={20} alt="Человек" /> : <Image src="/img/icons/car.svg" width={20} height={20} alt="Машина" />}
                      <span className="text-base text-(--secondary-color)">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl font-semibold">Точки интереса</h3>
              <div className="space-y-4">
                {[
                  { name: 'Пляж', time: '10 мин', walk: true },
                  { name: 'Музей', time: '15 мин', walk: false },
                  { name: 'Красная Поляна', time: '55 мин', walk: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-sm border border-[#D9D9D9] p-4">
                    <span className="text-base">{item.name}</span>
                    <div className="flex items-center gap-3">
                      {item.walk ? <Image src="/img/icons/man.svg" width={20} height={20} alt="Человек" /> : <Image src="/img/icons/car.svg" width={20} height={20} alt="Машина" />}
                      <span className="text-base text-(--secondary-color)">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullLocationSection;
