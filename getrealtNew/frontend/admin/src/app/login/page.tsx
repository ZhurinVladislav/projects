import img from '@/assets/img/login/img.jpg';
import LoginForm from '@/components/LoginForm';
import { SITE } from '@/config/site.config';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Войти`,
  description: `Авторизация в административной панели сайта | ${SITE.APP_NAME}`,
};

export default function LoginPage() {
  return (
    <section className="flex h-screen w-screen overflow-hidden rounded-(--border-radius)">
      <h1 className="visually-hidden">Административная панель | V|Site</h1>
      <div className="flex h-full w-full max-w-145.5 flex-col justify-center rounded-tr-xl rounded-br-xl bg-(--bg-op-1-color) p-10 backdrop-blur-3xl">
        <Image className="mb-20" src="/img/logo.svg" width={206} height={53} alt="Логотип V|Site" priority />

        <h2 className="mb-6 text-2xl">
          <span className="text-(--secondary-color)">Привет,</span> рады Вас видеть!
        </h2>
        <p className="mb-9">Пожалуйста, войдите, чтобы получить доступ к панели управления.</p>

        <LoginForm />

        <a href={SITE.APP_SITE_URL} className="mt-8 flex items-center gap-2.5 text-(--secondary-color)">
          <ChevronLeft className="text-(--secondary-color)" /> Вернуться назад
        </a>

        <small className="absolute bottom-5 left-5 text-sm">{SITE.APP_VERSION}</small>
      </div>

      <Image className="absolute top-0 right-0 -z-10 flex h-full w-336.5 rounded-tr-(--border-radius) rounded-br-(--border-radius) object-fill" src={img} alt="Пейзаж с горами" />
    </section>
  );
}
