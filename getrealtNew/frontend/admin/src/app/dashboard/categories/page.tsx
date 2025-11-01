import CategoriesServicesList from '@/components/CategoryServices/CategoriesServicesList';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Категории услуг`,
  description: `Добавление, редактирование и удаление категорий услуг | ${SITE.APP_NAME}`,
};

export default function CategoriesPage() {
  return <CategoriesServicesList />;
}
