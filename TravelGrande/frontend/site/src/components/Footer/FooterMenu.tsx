import { PAGES } from '@/config/pages.config';
import Link from 'next/link';

const FooterMenu = () => {
  return (
    <div className="flex gap-50 max-lg:w-full max-lg:justify-between max-lg:gap-12 max-md:flex-col max-md:gap-8">
      {/* Column 1 */}
      <nav className="flex flex-col gap-5">
        <Link className="transition-colors hover:text-(--primary-color)" href={PAGES.OBJECTS}>
          Объекты
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href={PAGES.CITIES}>
          Города
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href={PAGES.ABOUT_US}>
          О нас
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          FAQ
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Контакты
        </Link>
      </nav>

      {/* Column 2 */}
      <nav className="flex flex-col gap-5">
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Для собственников
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Как забронировать
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Политика конфиденциальности
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Пользовательское соглашение
        </Link>
        <Link className="transition-colors hover:text-(--primary-color)" href="#">
          Контакты
        </Link>
      </nav>
    </div>
  );
};

export default FooterMenu;
