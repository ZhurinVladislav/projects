import HomeHero from '@/components/Home/HomeHero';
import { SITE } from '@/config/site.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Недвижимость в Москве | ${SITE.APP_NAME}`,
  description: `Недвижимость в Москве | ${SITE.APP_NAME}`,
};

export default function Home() {
  return (
    <>
      <HomeHero />
    </>
  );
}
