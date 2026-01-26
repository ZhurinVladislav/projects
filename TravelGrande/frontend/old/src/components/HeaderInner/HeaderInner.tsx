import { SITE } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '../Header/MobileMenu';
import HeaderInnerMenu from './HeaderInnerMenu';

const HeaderInner = () => {
  return (
    <header data-testid="headerInner" className="relative z-1000 mb-20">
      <div className="container flex w-full justify-between gap-3 py-7.5">
        <Link href="/" className="flex h-12.5 max-w-77 transition-opacity hover:opacity-50">
          <Image className="h-full w-full" src="/img/logo-big.svg" width={308} height={50} alt={`Логотип ${SITE.APP_NAME}`} priority />
        </Link>

        <HeaderInnerMenu />

        <div className="flex gap-10 max-md:hidden">
          <Link
            href="/"
            className="flex h-10 items-center justify-center gap-2.5 rounded-full border border-(--primary-color) bg-(--primary-color) px-9 py-2.5 text-white transition-opacity hover:opacity-50 max-md:hidden"
          >
            Разместить объект
          </Link>

          <Link
            className="flex h-10 w-18 items-center justify-center gap-2.5 rounded-full border border-(--primary-color) bg-(--primary-color) p-3 transition-opacity hover:opacity-50 max-md:hidden"
            href="/"
          >
            <Image src="/img/icons/account.svg" width={48} height={24} alt="Иконка аккаунта" />
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default HeaderInner;
