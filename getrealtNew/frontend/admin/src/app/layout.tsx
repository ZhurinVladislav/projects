import { SITE } from '@/config/site.config';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
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
      <body className={`${openSans.variable} antialiased`}>
        <main className="page-transition">{children}</main>
      </body>
    </html>
  );
}
