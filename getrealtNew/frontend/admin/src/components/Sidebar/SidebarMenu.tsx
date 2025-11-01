'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Начальный экран' },
  { href: '/dashboard/resources', label: 'Ресурсы сайта' },
  { href: '/dashboard/categories', label: 'Категории услуг' },
  { href: '/dashboard/services', label: 'Услуги' },
  { href: '/dashboard/companies', label: 'Компании' },
  { href: '/dashboard/news', label: 'Новости' },
];

const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
      {links.map(link => (
        <Link key={link.href} href={link.href} className={`${pathname === link.href ? 'text-(--secondary-color)' : ''}`}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarMenu;
