import CategoryServicesCreate from '@/components/CategoryServices/CategoryServicesCreate';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Создание категории услуг`,
  description: `Создание категории услуг | ${SITE.APP_NAME}`,
};

export default function CategoryServicesCreatePage() {
  return <CategoryServicesCreate />;
}
