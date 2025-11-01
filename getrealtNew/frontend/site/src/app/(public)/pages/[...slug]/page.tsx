import Api from '@/app/api';
import PageSectionContent from '@/components/PageSectionContent';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type TProps = {
  params: Promise<{ slug?: string[] }>;
};

/**
 * Получение данных страницы
 */
async function getPageData(slug?: string[]) {
  try {
    const alias = [...(slug || [])].join('/');

    if (!alias || /\.(png|jpe?g|svg|webp|gif|ico|json|xml|txt|map)$/i.test(alias)) {
      // можно вернуть null, чтобы страница 404 не ломалась
      return null;
    }

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

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) {
    return {
      title: `Страница не найдена | ${SITE.APP_NAME}`,
      description: `К сожалению, запрашиваемая страница не найдена.`,
    };
  }

  return {
    title: `${data.pageTitle || data.longTitle || 'Страница'} | ${SITE.APP_NAME}`,
    description: data.description || '',
    openGraph: {
      title: data.pageTitle || data.longTitle || SITE.APP_NAME,
      description: data.description || '',
      url: `${SITE.APP_URL}/${(slug || []).join('/')}`,
      siteName: SITE.APP_NAME,
      type: 'article',
    },
    icons: {
      icon: './favicon.svg',
    },
  };
}

export default async function Page({ params }: TProps) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) notFound();

  return <PageSectionContent data={data} />;

  // try {
  //   const response = await Api.fetchGetPageByAlias(alias);
  //   const data = response.data;

  //   return <PageSectionContent data={data} />;
  // } catch (error) {
  //   return <NotFoundPage />;
  //   // const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
  //   // return <p>Ошибка загрузки: {message}</p>;
  // }
}
