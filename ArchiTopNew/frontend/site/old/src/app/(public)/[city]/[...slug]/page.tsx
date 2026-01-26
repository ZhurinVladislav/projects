import Api from '@/app/api';
import PageContent from '@/components/PageContent';
import { SITE } from '@/config/site.config';
import { TemplateCompany, TemplateService, TemplateServices } from '@/templates';
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
    title: `${data.pageTitle || data.longTitle || 'Страница'}`,
    description: data.description || '',
    openGraph: {
      title: data.pageTitle || data.longTitle || SITE.APP_NAME,
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
export default async function Page({ params }: TProps) {
  const { city, slug } = await params;
  const data = await getPageData(city, slug);

  if (!data) notFound();

  const section = slug?.[0];

  switch (section) {
    case 'services':
      if (slug && slug.length > 1) {
        // /moscow/services/real-estate-valuation
        return <TemplateService dataPage={data} />;
      } else {
        // /moscow/services
        return <TemplateServices dataPage={data} />;
      }

    case 'companies':
      return <TemplateCompany dataPage={data} />;

    case 'blog':
      return <PageContent title="Блог" content={data.content} />;

    default:
      return (
        <>
          {/* <Breadcrumbs /> */}
          <PageContent title={data.pageTitle} content={data.content} />
        </>
      );
  }
}
