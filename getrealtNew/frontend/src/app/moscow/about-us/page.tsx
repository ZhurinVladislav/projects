import Breadcrumbs from '@/components/Breadcrumbs';
import PageContent from '@/components/PageContent';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `О проекте рейтинга недвижимости ${SITE.CITY_IN} | ${SITE.APP_NAME}`,
  description: `О проекте рейтинга недвижимости ${SITE.CITY_IN} | ${SITE.APP_NAME}`,
};

export default function AboutUs() {
  const content: string = `    
		<p>
			<strong>GetRealt</strong> — это независимый онлайн-ресурс, формирующий рейтинги риэлторских агентств, застройщиков, новостроек, коттеджных 
			посёлков, а также компаний, занимающихся строительством, ремонтом и дизайном интерьеров.
		</p>
		<p>
			Рейтинги создаются на основе проверенных отзывов и оценок пользователей, обеспечивая прозрачность и объективность.
		</p>
		<p>
			Проект не занимается продажей недвижимости, что гарантирует его независимость.
		</p>
		<p>
			Сайт ежемесячно посещают тысячи пользователей, а база данных включает сотни рейтингов и компаний, помогая выбрать надёжных профессионалов в сфере недвижимости.
		</p>
	`;

  return (
    <>
      <Breadcrumbs />
      <PageContent title="О проекте" content={content} />
    </>
  );
}
