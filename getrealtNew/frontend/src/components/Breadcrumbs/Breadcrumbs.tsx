'use client';

// import { MENU } from '@/shared/data/menu.data';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Breadcrumbs = () => {
//   const pathname = usePathname(); // пример: "/blog/it/nextjs"
//   const segments = pathname.split('/').filter(Boolean);

//   // Функция: ищем красивое имя в MENU
//   const getPageName = (href: string, fallback: string) => {
//     const item = MENU.find(m => m.href === href);
//     return item ? item.name : fallback;
//   };

//   const breadcrumbs = segments.map((segment, index) => {
//     const href = '/' + segments.slice(0, index + 1).join('/');
//     const name = getPageName(href, segment.replace(/-/g, ' '));
//     return { name, href };
//   });

//   return (
//     <div className="container mb-7">
//       <nav aria-label="breadcrumbs">
//         <ul className="flex gap-2 text-sm">
//           <li>
//             <Link href="/">Главная</Link>
//             {segments.length > 0 && ' / '}
//           </li>
//           {breadcrumbs.map((crumb, i) => (
//             <li key={i}>
//               <Link href={crumb.href}>{crumb.name}</Link>
//               {i < breadcrumbs.length - 1 && ' / '}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Breadcrumbs;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname(); // пример: "/blog/it/nextjs"

  // Разбиваем путь на сегменты
  const segments = pathname.split('/').filter(Boolean); // ["blog", "it", "nextjs"]

  // Построение объектов {name, href}
  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    // Можно кастомизировать отображение названия
    const name = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return { name, href };
  });

  return (
    <div data-testid="breadcrumbs" className="container mb-7">
      <nav aria-label="breadcrumbs">
        <ul className="flex gap-2 text-sm">
          <li>
            <Link href="/">Главная</Link>
            {segments.length > 0 && ' / '}
          </li>
          {breadcrumbs.map((crumb, i) => (
            <li key={i}>
              <Link href={crumb.href}>{crumb.name}</Link>
              {i < breadcrumbs.length - 1 && ' / '}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
