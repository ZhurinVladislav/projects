import { SITE } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
    <header data-testid="header" className="absolute top-0 left-0 z-50">
      <div className="container">
        <div className="mb-12 flex justify-between pt-7.5">
          {/* List Property Button */}
          <Link
            href="#"
            className="flex h-10 items-center justify-center gap-2.5 rounded-full border border-white px-9 py-2.5 text-white transition-colors hover:border-(--primary) hover:bg-(--primary) hover:text-white max-md:hidden"
          >
            Разместить объект
          </Link>

          {/* Logo */}
          <Link href="/" className="-ml-40 transition-opacity hover:opacity-50 max-md:mr-auto max-md:ml-0 max-md:h-20 max-md:w-30">
            <Image src="/img/logo-white.svg" width={236} height={125} alt={`Логотип ${SITE.APP_NAME}`} priority />
          </Link>

          {/* User Menu Button - Desktop */}
          <Link
            className="flex h-10 w-18 items-center justify-center gap-2.5 rounded-full border border-white p-3 transition-colors hover:border-(--primary) hover:bg-(--primary) max-md:hidden"
            href="#"
          >
            <Image src="/img/icons/account.svg" width={48} height={24} alt="Иконка аккаунта" />
          </Link>

          {/* Mobile Menu */}
          <MobileMenu isWhite />
        </div>

        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
