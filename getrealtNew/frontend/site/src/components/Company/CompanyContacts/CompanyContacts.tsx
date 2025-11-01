import addressIcon from '@/assets/icons/address.svg';
import clockIcon from '@/assets/icons/clock.svg';
import computerIcon from '@/assets/icons/computer.svg';
import eMailIcon from '@/assets/icons/e-mail.svg';
import homeIcon from '@/assets/icons/home.svg';
import internetIcon from '@/assets/icons/internet.svg';
import linkIcon from '@/assets/icons/link.svg';
import phoneIcon from '@/assets/icons/phone.svg';
import Image from 'next/image';

const CompanyContacts: React.FC = () => {
  return (
    <section data-testid="company-contacts" className="section">
      <div className="container">
        <div className="flex justify-between gap-17 max-lg:gap-6 max-md:flex-col">
          <div className="card">
            <h2 className="title-2">Контакты</h2>

            <ul className="list-info">
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={homeIcon} alt="Телефон" width={24} height={24} />
                <p className="list-info__item-title">Компания:</p>
                <p className="list-info__item-text">Апекс-Недвижимость</p>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={internetIcon} alt="Интернет" width={24} height={24} />
                <p className="list-info__item-title">Сайт:</p>
                <a className="list-info__item-link" href="#">
                  apex-realty.ru
                </a>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={addressIcon} alt="Адрес" width={24} height={24} />
                <p className="list-info__item-title">Адрес:</p>
                <p className="list-info__item-text">
                  Сочи, Лазаревское, ул. Победы 82а
                  <a className="link-border" href="#">
                    (на карте)
                  </a>
                </p>
              </li>
            </ul>

            <ul className="list-info list-info_last">
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={eMailIcon} alt="Электронная почта" width={24} height={24} />
                <p className="list-info__item-title">Email:</p>
                <a className="list-info__item-link" href="mailto:apex@apex-realty.ru" target="_blank">
                  apex@apex-realty.ru
                </a>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={phoneIcon} alt="Телефон" width={24} height={24} />
                <a className="list-info__item-link list-info__item-link_bold" href="tel:+79993690155" target="_blank">
                  +7 999 369 01 55
                </a>
                <p className="list-info__item-text"> - Общий</p>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={phoneIcon} alt="Телефон" width={24} height={24} />
                <a className="list-info__item-link list-info__item-link_bold" href="tel:+79181494675" target="_blank">
                  +7 918 149 46 75
                </a>
                <p className="list-info__item-text"> - ул. Победы 82а</p>
              </li>
            </ul>
          </div>

          <div className="card w-full max-w-190">
            <ul className="list-info list-info_last">
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={linkIcon} alt="Ссылка" width={24} height={24} />
                <p className="list-info__item-title">Социальные сети:</p>
                <ul className="list-info__links">
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      Вконтакте
                    </a>
                  </li>
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      YouTube
                    </a>
                  </li>
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      Instagram
                    </a>
                  </li>
                </ul>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={computerIcon} alt="Компьютер" width={24} height={24} />
                <p className="list-info__item-title">Сервисы:</p>
                <ul className="list-info__links">
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      Авито
                    </a>
                  </li>
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      Циан
                    </a>
                  </li>
                  <li className="list-info__links-item">
                    <a className="list-info__links-item-link link-border" href="#" target="_blank">
                      Домклик
                    </a>
                  </li>
                </ul>
              </li>
              <li className="list-info__item">
                <Image className="list-info__item-icon" src={clockIcon} alt="Часы" width={24} height={24} />
                <ul className="list-info__list">
                  <li className="list-info__list-item">Понедельник 08:00 - 20:00</li>
                  <li className="list-info__list-item">Вторник 08:00 - 20:00</li>
                  <li className="list-info__list-item">Среда 08:00 - 20:00</li>
                  <li className="list-info__list-item">Четверг 08:00 - 20:00</li>
                  <li className="list-info__list-item">Пятница 08:00 - 20:00</li>
                  <li className="list-info__list-item">Суббота 08:00 - 20:00</li>
                  <li className="list-info__list-item">Воскресенье 08:00 - 20:00</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyContacts;
