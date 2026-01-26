import CategoryServices from '@/components/CategoryServices/CategoryServices';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Обновление категории`,
  description: `Обновление категории услуги | ${SITE.APP_NAME}`,
};

export default async function CategoryServicesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <CategoryServices id={id} />;
}
