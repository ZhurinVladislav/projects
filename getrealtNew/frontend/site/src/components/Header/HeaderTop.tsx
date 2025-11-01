// import IconMark from '@/assets/icons/mark.svg';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '../MobileMenu';
import CustomBtn from '../ui/CustomBtn';

const HeaderTop = () => {
  return (
    <div data-testid="header-top" className="mb-4 flex w-full items-center justify-between gap-3 border-b border-[rgba(162,162,162,0.32)] pt-8 pb-3.5">
      <div className="flex items-center justify-center gap-4">
        <Link className="linear flex min-h-6 max-w-3xs items-center transition-opacity duration-300 hover:opacity-50" href="/">
          <Image src="/img/logo.svg" width={220} height={64} alt="Логотип GetRealt" priority />
        </Link>

        <button className="flex min-h-max items-center justify-center gap-1">
          <MapPin className="text-(--link-second-color)" />
          Москва
        </button>
      </div>

      {/* <SearchForm typeEl="phone" /> */}

      <CustomBtn ariaLabel="Открыть выпадающий список" text="Связаться с нами" customClasses={'shrink-0'} />

      <MobileMenu />
    </div>
  );
};

export default HeaderTop;
