import { SITE } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import FooterMenu from './FooterMenu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="mt-auto border-t border-[rgba(162,162,162,0.32)] py-11 text-base">
      <div className="container">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Link className="linear flex min-h-6 max-w-3xs items-center transition-opacity duration-300 hover:opacity-50" href="/">
              <Image src="/img/logo.svg" width={220} height={64} alt="Логотип GetRealt" priority />
            </Link>
            <small className="text-base">Все права защищены © {currentYear}</small>
          </div>

          <FooterMenu />

          <div className="flex flex-col justify-between gap-2.5">
            <div>
              <p>Реклама и сотрудничество</p>
              <a className="transition-colors duration-300 ease-linear hover:text-(--link-second-color)" href={`mailto:${SITE.E_MAIL}`}>
                {SITE.E_MAIL}
              </a>
            </div>
            <Link className="transition-colors duration-300 ease-linear hover:text-(--link-second-color)" href="#">
              Пользовательское соглашение
            </Link>
            <a className="text-(--text-color-second) transition-colors duration-300 ease-linear hover:text-(--link-second-color)" href="https://web2.agency/" target="_blank">
              WEB2 | создание сайтов
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
