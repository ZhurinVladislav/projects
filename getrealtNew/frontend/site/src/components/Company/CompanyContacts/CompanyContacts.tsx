import addressIcon from '@/assets/icons/address.svg';
import clockIcon from '@/assets/icons/clock.svg';
import computerIcon from '@/assets/icons/computer.svg';
import eMailIcon from '@/assets/icons/e-mail.svg';
import homeIcon from '@/assets/icons/home.svg';
import internetIcon from '@/assets/icons/internet.svg';
import linkIcon from '@/assets/icons/link.svg';
import phoneIcon from '@/assets/icons/phone.svg';
import { TCompanyInfo } from '@/types';
import Image from 'next/image';

interface IProps {
  company: TCompanyInfo | null;
}

const CompanyContacts: React.FC<IProps> = props => {
  const { company } = props;

  if (!company) {
    return <></>;
  }

  const { title, siteUrl, address, mapLink, email, phone, socials, servicesLinks, workdays } = company;

  return (
    <section data-testid="company-contacts" className="section">
      <div className="container">
        <div className="flex justify-between gap-17 max-lg:gap-6 max-md:flex-col">
          <div className="card">
            <h2 className="title-2">Контакты</h2>

            <ul className="list-info">
              {title && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={homeIcon} alt="Телефон" width={24} height={24} />
                  <p className="list-info__item-title">Компания:</p>
                  <p className="list-info__item-text">{title}</p>
                </li>
              )}
              {siteUrl && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={internetIcon} alt="Интернет" width={24} height={24} />
                  <p className="list-info__item-title">Сайт:</p>
                  <a className="list-info__item-link" href={siteUrl} target="_blank">
                    {siteUrl}
                  </a>
                </li>
              )}
              {address && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={addressIcon} alt="Адрес" width={24} height={24} />
                  <p className="list-info__item-title">Адрес:</p>
                  <p className="list-info__item-text">
                    {address}
                    {mapLink && (
                      <a className="link-border" href={mapLink} target="_blank">
                        (на карте)
                      </a>
                    )}
                  </p>
                </li>
              )}
            </ul>

            <ul className="list-info list-info_last">
              {email && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={eMailIcon} alt="Электронная почта" width={24} height={24} />
                  <p className="list-info__item-title">Email:</p>
                  <a className="list-info__item-link" href={`mailto: ${email}`} target="_blank">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={phoneIcon} alt="Телефон" width={24} height={24} />
                  <a className="list-info__item-link list-info__item-link_bold" href={`tel:${phone}`} target="_blank">
                    {phone}
                  </a>
                  <p className="list-info__item-text"> - Общий</p>
                </li>
              )}

              {/* <li className="list-info__item">
                <Image className="list-info__item-icon" src={phoneIcon} alt="Телефон" width={24} height={24} />
                <a className="list-info__item-link list-info__item-link_bold" href="tel:+79181494675" target="_blank">
                  +7 918 149 46 75
                </a>
                <p className="list-info__item-text"> - ул. Победы 82а</p>
              </li> */}
            </ul>
          </div>

          <div className="card w-full max-w-190">
            <ul className="list-info list-info_last">
              {Array.isArray(socials) && socials.length > 0 && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={linkIcon} alt="Ссылка" width={24} height={24} />
                  <p className="list-info__item-title">Социальные сети:</p>

                  <ul className="list-info__links">
                    {socials
                      .filter(link => link && link.url && link.platform)
                      .map(link => (
                        <li className="list-info__links-item" key={link.id}>
                          <a className="list-info__links-item-link link-border" href={link.url || ''} target="_blank" rel="noopener noreferrer">
                            {link.platform}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              )}

              {Array.isArray(servicesLinks) && servicesLinks.length > 0 && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={computerIcon} alt="Компьютер" width={24} height={24} />
                  <p className="list-info__item-title">Сервисы:</p>

                  <ul className="list-info__links">
                    {servicesLinks
                      .filter(link => link && link.url && link.serviceName)
                      .map(link => (
                        <li className="list-info__links-item" key={link.id}>
                          <a className="list-info__links-item-link link-border" href={link.url || ''} target="_blank" rel="noopener noreferrer">
                            {link.serviceName}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              )}

              {Array.isArray(workdays) && workdays.length > 0 && (
                <li className="list-info__item">
                  <Image className="list-info__item-icon" src={clockIcon} alt="Часы" width={24} height={24} />

                  <ul className="list-info__list">
                    {workdays
                      .filter(day => day && day.day && (day.hours || day.isDayOff))
                      .map(day => (
                        <li className="list-info__list-item" key={day.id || day.day}>
                          {day.day}: {day.isDayOff ? 'выходной' : day.hours}
                        </li>
                      ))}
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyContacts;
