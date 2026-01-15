import Api from '@/app/api';
import FilterServices from '@/components/FilterServices';
import PageContent from '@/components/PageContent';
import Services from '@/components/Services';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 43200;

interface TProps {
  params: Promise<{ city: string; slug?: string[] }>;
}

/**
 * Получение данных страницы
 */
async function getPageData(city: string, slug?: string[]) {
  try {
    const alias = [city, ...(slug || [])].join('/');

    // ⚠️ Пропускаем статические пути (favicon, картинки и пр.)
    if (!alias || /\.(png|jpe?g|svg|webp|gif|ico|json|xml|txt|map)$/i.test(alias)) {
      // можно вернуть null, чтобы страница 404 не ломалась
      return null;
    }

    const response = await Api.fetchGetPageByAlias(alias);

    if (!response || response.status === false || !response.data) {
      return null;
    }

    return response.data;
  } catch {
    return null;
  }
}

/**
 * SEO метаданные
 */
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { city, slug } = await params;
  const data = await getPageData(city, slug);

  if (!data) {
    return {
      title: `Страница не найдена`,
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
      url: `${SITE.APP_URL}/${city}/${(slug || []).join('/')}`,
      siteName: SITE.APP_NAME,
      type: 'article',
    },
    icons: {
      icon: './favicon.svg',
    },
  };
}

/**
 * Основной компонент страницы
 */
export default async function CitePage({ params }: TProps) {
  const { city, slug } = await params;
  const data = await getPageData(city, slug);

  if (!data) notFound();

  return (
    <>
      {/* <Breadcrumbs /> */}
      <Services dataPage={data} />
      <FilterServices dataPage={data} dataServices={null} isMain={true} />
      {data && <PageContent content={data.content} />}
    </>
  );
}
