import CompanyShow from '@/components/Company/CompanyShow';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Обновление компании`,
  description: `Обновление компании | ${SITE.APP_NAME}`,
};

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <CompanyShow id={id} />;
}
