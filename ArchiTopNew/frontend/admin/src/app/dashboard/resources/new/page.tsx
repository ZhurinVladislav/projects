import ResourcesNew from '@/components/ResourcesNew';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Создание нового ресурса`,
  description: `Создание нового ресурса сайта | ${SITE.APP_NAME}`,
};

export default function ResourcesNewPage() {
  return <ResourcesNew />;
}
