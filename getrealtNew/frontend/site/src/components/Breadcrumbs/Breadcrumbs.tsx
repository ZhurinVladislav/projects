'use client';

import clsx from 'clsx';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const segmentNames: Record<string, string> = {
  moscow: 'Москва',
  spb: 'Санкт-Петербург',
  services: 'Услуги',
  companies: 'Компании',
  blog: 'Блог',
  about: 'О компании',
  contacts: 'Контакты',
};

const Breadcrumbs = () => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    // Локализуем название
    const name = segmentNames[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return { name, href };
  });

  return (
    <div className="container mx-auto mb-6 px-4">
      <nav aria-label="breadcrumbs" className="text-sm text-gray-500">
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="flex items-center gap-1 text-blue-600 hover:underline">
              <Home size={16} />
              <span>Главная</span>
            </Link>
          </li>

          {breadcrumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              {i === breadcrumbs.length - 1 ? (
                <span className={clsx('font-medium text-gray-700')}>{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="text-blue-600 hover:underline">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
