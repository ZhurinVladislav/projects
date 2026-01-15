import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { SITE } from '@/config/site.config';
import type { Metadata } from 'next';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import { Montserrat, Tenor_Sans } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['cyrillic'],
  display: 'swap',
});

const tenorSans = Tenor_Sans({
  weight: '400',
  variable: '--font-tenor-sans',
  subsets: ['cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.APP_NAME}`,
    default: '',
  },
  icons: {
    icon: './favicon.svg',
  },
  verification: {
    google: 'FME3Br3e-rGE4yiv9DSdJpLWiEO2wsjWPH1oWE8AGVg',
    yandex: '2a37eec3c38b818e',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${tenorSans.variable} antialiased`}>
        <YandexMetricaProvider
          tagID={106075015}
          initParameters={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
          }}
          router="app"
        >
          <Header />
          <main className="page-transition">{children}</main>
          <Footer />
          <ScrollToTop variant="filled" />
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
