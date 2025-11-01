import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Административная панель`,
  description: `Главная страница административной панели сайта | ${SITE.APP_NAME}`,
};

export default function DashboardPage() {
  return (
    <>
      <h1 className="title-1">Панель администратора</h1>
      <p>Добро пожаловать в админку 👋</p>
    </>
  );
}
