'use client';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';

const HeaderMenu = () => {
  // const pathname = usePathname();

  return (
    <nav className="mx-auto my-0 mt-12 flex max-w-fit flex-col items-center gap-1.5 border-b-white max-md:mt-8">
      <div className="flex items-center gap-16 max-md:gap-8 max-sm:gap-4">
        <Link href={PAGES.HOME} className="text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm">
          Главная
        </Link>
        <Link href={PAGES.OBJECTS} className="text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm">
          Объекты
        </Link>
        <Link href={PAGES.CITIES} className="text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm">
          Города
        </Link>
      </div>

      <div className="flex w-full flex-col items-start">
        <div className="h-px w-full bg-white/20"></div>
        <div className="h-px w-21 bg-white"></div>
      </div>
    </nav>
  );

  // return (
  // 	<nav data-testid='header-menu'>
  // 		<ul className='flex gap-2'>
  // 			{MENU.map(menuItem => (
  // 				<li key={menuItem.id}>
  // 					{/* <CustomLink
  // 						type='text'
  // 						href={menuItem.href}
  // 						isActive={!!match(menuItem.href)(pathname)}
  // 						isOuter={false}
  // 						text={menuItem.name}
  // 					/> */}
  // 					<Link href={menuItem.href}>{menuItem.name}</Link>
  // 				</li>
  // 			))}
  // 		</ul>
  // 	</nav>
  // );
};

export default HeaderMenu;
