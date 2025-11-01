'use client';

import { MENU } from '@/shared/data/menu.data';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import CustomLink from '../ui/CustomLink';

const FooterMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="max-lg:hidden" data-testid="footer-menu">
      <ul className="flex flex-col gap-4">
        {MENU.map(menuItem => (
          <li key={menuItem.id}>
            <CustomLink type="text-base" href={menuItem.href} isActive={!!match(menuItem.href)(pathname)} isOuter={false} text={menuItem.name} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterMenu;
