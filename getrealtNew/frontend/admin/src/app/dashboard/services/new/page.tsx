import ServiceCreate from '@/components/Service/ServiceCreate';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Создание категории услуг`,
  description: `Создание категории услуг | ${SITE.APP_NAME}`,
};

export default function ServiceCreatePage() {
  return <ServiceCreate />;
}
