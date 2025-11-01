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
    title: `${data.pageTitle || data.longTitle || 'Страница'}`,
    description: data.description || '',
    openGraph: {
      title: data.pageTitle || data.longTitle || SITE.APP_NAME,
      description: data.description || '',
      url: SITE.APP_URL,
      siteName: SITE.APP_NAME,
      type: 'website',
    },
  };
  // try {
  //   const response = await Api.fetchGetPageByAlias('index');
  //   const data = response.data;

  //   return {
  //     title: data?.pageTitle || `Недвижимость в Москве | ${SITE.APP_NAME}`,
  //     description: data?.description || SITE.APP_DESCRIPTION,
  //     openGraph: {
  //       title: data?.pageTitle || SITE.APP_NAME,
  //       description: data?.description || SITE.APP_DESCRIPTION,
  //       url: SITE.APP_URL,
  //       siteName: SITE.APP_NAME,
  //       type: 'website',
  //     },
  //   };
  // } catch (error) {
  //   const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
  //   return {
  //     title: `Ошибка получения страницы!`,
  //     description: message,
  //   };
  // }
}

// Основной компонент страницы
export default async function HomePage() {
  const data = await getPageData();

  // if (!data) notFound();

  return (
    <>
      <HomeHero />
      <Services />
      {/* <SliderNews /> */}
      {data && <HomeContent content={data?.content} />}
    </>
  );

  // try {
  //   const response = await Api.fetchGetPageByAlias('index');
  //   const data = response.data;

  //   return (
  //     <>
  //       <HomeHero />
  //       <Services />
  //       <SliderNews />
  //       {data && <HomeContent content={data.content} />}
  //     </>
  //   );
  // } catch (error) {
  //   console.error('Ошибка загрузки главной страницы:', error);
  //   return <p>Не удалось загрузить главную страницу.</p>;
  // }
}
