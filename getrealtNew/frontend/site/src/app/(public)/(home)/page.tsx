import Api from '@/app/api';
import HomeContent from '@/components/Home/HomeContent';
import HomeHero from '@/components/Home/HomeHero';
import Services from '@/components/Services';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

const alias = 'index';

/**
 * Получение данных страницы
 */
async function getPageData() {
  try {
    const response = await Api.fetchGetPageByAlias(alias);

    if (
      !response ||
      response.status === false ||
      !response.data ||
      !response.data.id || // например, у реальных страниц всегда есть ID
      Object.keys(response.data).length === 0
    ) {
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}

// Генерация SEO-метаданных
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageData();

  if (!data) {
    return {
      title: `Страница не найдена | ${SITE.APP_NAME}`,
      description: `К сожалению, запрашиваемая страница не найдена.`,
    };
  }

  return {
    title: `${data.longTitle || data.pageTitle || 'Страница'}`,
    description: data.description || '',
    keywords: data.keywords || '',
    openGraph: {
      title: data.longTitle || data.pageTitle || SITE.APP_NAME,
      description: data.description || '',
      url: SITE.APP_URL,
      siteName: SITE.APP_NAME,
      type: 'website',
    },
  };
}

// Основной компонент страницы
export default async function HomePage() {
  const data = await getPageData();

  return (
    <>
      <HomeHero />
      <Services />
      {/* <SliderNews /> */}
      {data && <HomeContent content={data?.content} />}
    </>
  );
}
