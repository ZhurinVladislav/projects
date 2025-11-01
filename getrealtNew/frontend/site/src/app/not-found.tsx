// import NotFound from '@/components/NotFound';
// import { SITE } from '@/config/site.config';
// import { Metadata } from 'next';

import Link from 'next/link';

// export const metadata: Metadata = {
//   title: `Ошибка 404`,
//   description: `Страница была уделена или перемещена | ${SITE.APP_NAME}`,
// };

// export default function NotFoundPage() {
//   return <NotFound />;
// }
// export const metadata: Metadata = {
//   title: `Ошибка 404`,
//   description: `Страница была уделена или перемещена | ${SITE.APP_NAME}`,
// };
// export const metadata: Metadata = {
//   title: `Ошибка 404`,
//   description: `Страница была уделена или перемещена`,
// };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title-1">Страница не найдена</h1>
        <p>Данная страница не существует, она была удалена или перемещена</p>
        <Link href="/" className="text-blue-600 underline">
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
}
