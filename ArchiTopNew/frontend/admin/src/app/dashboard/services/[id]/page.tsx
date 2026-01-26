import ServiceShow from '@/components/Service/ServiceShow';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Обновление услуги`,
  description: `Обновление услуги | ${SITE.APP_NAME}`,
};

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ServiceShow id={id} />;
}
