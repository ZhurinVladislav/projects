import Breadcrumbs from '@/components/Breadcrumbs';
import PageContent from '@/components/PageContent';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Методика проекта рейтинга недвижимости ${SITE.CITY_IN} | ${SITE.APP_NAME}`,
  description: `Методика проекта рейтинга недвижимости ${SITE.CITY_IN} | ${SITE.APP_NAME}`,
};

export default function Methodology() {
  const content: string = `          
		<p>
			Мы&nbsp;формируем рейтинг компаний на&nbsp;основе их&nbsp;средней оценки, рассчитанной по&nbsp;отзывам, найденным в&nbsp;поисковых системах Яндекс и&nbsp;Google. Компании с&nbsp;более высокой средней оценкой занимают верхние позиции в&nbsp;рейтинге.
		</p>
		<p>
			Показатель «Средняя оценка» указывает среднее арифметическое всех отзывов о&nbsp;компании, собранных с&nbsp;обеих платформ (по&nbsp;5-бальной шкале). Для наглядности рядом с&nbsp;логотипами Яндекса и&nbsp;Google указаны отдельные средние оценки с&nbsp;каждой из&nbsp;платформ.
		</p>
		<p>
			Чтобы просмотреть отзывы, нажмите на&nbsp;название компании или объекта. На&nbsp;странице с&nbsp;подробной информацией вы&nbsp;сможете перейти к&nbsp;отзывам на&nbsp;Яндексе или Google, кликнув на&nbsp;соответствующий значок.
		</p>
	`;

  return (
    <>
      <Breadcrumbs />
      <PageContent title="Методика" content={content} />
    </>
  );
}
