import Header from '@/components/Header';
import { SITE } from '@/config/site.config';
import type { Metadata } from 'next';
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${tenorSans.variable} antialiased`}>
        <Header />
        <main className="page-transition">{children}</main>
      </body>
    </html>
  );
}
