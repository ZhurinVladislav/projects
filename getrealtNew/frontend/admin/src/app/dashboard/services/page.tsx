import ServiceList from '@/components/Service/ServiceList';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Услуги`,
  description: `Добавление, редактирование и удаление услуг | ${SITE.APP_NAME}`,
};

export default function ServicesPage() {
  return <ServiceList />;
}
