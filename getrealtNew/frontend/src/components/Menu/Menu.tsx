'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import CustomLink from '../ui/CustomLink';
import { MENU } from './menu.data';

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className="max-lg:hidden" data-component="header-menu">
      <ul className="flex gap-10">
        {MENU.map(menuItem => (
          <li key={menuItem.id}>
            <CustomLink type="text" href={menuItem.href} isActive={!!match(menuItem.href)(pathname)} isOuter={false} text={menuItem.name} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
