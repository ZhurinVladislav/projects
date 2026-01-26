import { PAGES } from '@/config/pages.config';
import Link from 'next/link';

const HeaderInnerMenu = () => {
  return (
    <nav className="flex max-w-fit flex-col items-center gap-1.5 border-b-white max-md:mt-8 max-md:hidden">
      <div className="flex items-center gap-16 max-md:gap-8 max-sm:gap-4">
        <Link href={PAGES.HOME} className="text-base font-normal transition-opacity hover:opacity-80 max-sm:text-sm">
          Главная
        </Link>
        <Link href={PAGES.OBJECTS} className="text-base font-normal transition-opacity hover:opacity-80 max-sm:text-sm">
          Объекты
        </Link>
        <Link href={PAGES.CITIES} className="text-base font-normal transition-opacity hover:opacity-80 max-sm:text-sm">
          Города
        </Link>
      </div>

      <div className="flex w-full flex-col items-start">
        <div className="h-px w-full bg-(--gray-color)/20"></div>
        {/* <div className="h-px w-21 bg-(--text-color)"></div> */}
      </div>
    </nav>
  );
};

export default HeaderInnerMenu;
