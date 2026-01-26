import { SITE } from '@/config/site.config';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const timesNewRoman = localFont({
  src: [
    {
      path: '../../public/fonts/times-new-roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/times-new-roman.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/times-new-roman-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/times-new-roman-italic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-times-new-roman',
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.APP_NAME}`,
    default: SITE.APP_NAME,
  },
  description: SITE.APP_DESCRIPTION,
  icons: {
    icon: './img/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="overflow-x-hidden">
      <body className={`${timesNewRoman.className} ${openSans.className} overflow-x-hidden antialiased`}>{children}</body>
    </html>
  );
}
