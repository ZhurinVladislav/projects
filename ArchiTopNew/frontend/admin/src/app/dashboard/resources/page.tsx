import Resources from '@/components/Resources';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Ресурсы сайта`,
  description: `Добавление, редактирование и удаление ресурсов сайта | ${SITE.APP_NAME}`,
};

export default function ResourcesPage() {
  return <Resources />;
}
