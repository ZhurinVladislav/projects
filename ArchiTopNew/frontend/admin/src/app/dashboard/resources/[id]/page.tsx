import Resource from '@/components/Resource';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Обновление ресурса сайта',
  description: `Обновление ресурса сайта | ${SITE.APP_NAME}`,
};

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <Resource id={id} />;
}
