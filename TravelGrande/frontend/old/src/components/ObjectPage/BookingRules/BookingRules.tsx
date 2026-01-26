import Image from 'next/image';
import Link from 'next/link';

const BookingRules = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="border-b border-(--border-color) pb-8">
          <h2 className="mb-6 text-2xl">Правила бронирования</h2>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-8 text-xl text-(--gray-color)">Правила дома</h3>
              <div className="space-y-3">
                {['Дети приветствуются ( 1-12 лет )', 'Младенцы приветствуются ( до12 месяцев )', 'Домашние животные приветствуются', 'Никаких вечеринок или мероприятий', 'Курение запрещено'].map(
                  (rule, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${idx > 2 ? 'bg-(--text-color)' : 'bg-(--background-color)'} shrink-0`}>
                        {idx > 2 ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.5 1L1 12.5M1 1L12.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M1 8.19231L3.415 11.2973C3.49649 11.4032 3.60091 11.4892 3.72041 11.549C3.83992 11.6087 3.97141 11.6407 4.105 11.6423C4.23645 11.6439 4.36658 11.616 4.48594 11.561C4.60529 11.5059 4.71087 11.4248 4.795 11.3238L12.5 2"
                              stroke="#BE8817"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-base text-black">{rule}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-xl text-(--gray-color)">Полезно знать</h3>
              <div className="space-y-3">
                {[
                  { icon: 'clock', text: 'Прибытие  с 15:00' },
                  { icon: 'clock', text: 'Выезд до 11:00' },
                  { icon: 'snow', text: 'Кондиционер' },
                  { icon: 'wifi', text: 'Wi-Fi' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--background-color)">
                      {item?.icon === 'clock' && <Image src="/img/icons/clock.svg" width={32} height={32} alt="Часы" />}
                      {item?.icon === 'snow' && <Image src="/img/icons/snow.svg" width={32} height={32} alt="Кондиционер" />}
                      {item?.icon === 'wifi' && <Image src="/img/icons/wifi.svg" width={32} height={32} alt="wi-fi" />}
                    </div>
                    <span className="text-base text-black">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl text-(--gray-color)">Политика отмены бронирования</h3>

              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12.5 w-12.5 shrink-0 flex-col items-center justify-center rounded bg-(--primary-color)">
                  <div className="font-[--font-primary] text-2xl leading-tight text-white">24</div>
                  <div className="font-[--font-primary] text-base leading-tight text-white">часа</div>
                </div>
                <div className="flex-1">
                  <p className="mb-4 text-base leading-4.5">При отмене бронирование не позднее, чем за 24 часа до даты заезда, мы вернем вам полную стоимость</p>
                  <p className="text-base leading-4.5">Возврат средств невозможен, если до даты заезда осталось менее 24 часов.</p>
                </div>
              </div>

              <Link href="#" className="text-base font-semibold text-(--secondary-color) underline hover:text-(--primary-color)">
                Посмотреть полные условия
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingRules;
