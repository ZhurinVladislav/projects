import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { SITE } from "@/config/site.config"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const radiotechnika400 = localFont({
  src: [
    {
      path: "../../public/fonts/Radiotechnika400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Radiotechnika400.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-radiotechnika400",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE.APP_NAME}`,
    default: SITE.APP_NAME,
  },
  description: SITE.APP_DESCRIPTION,
  icons: {
    icon: "./img/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="overflow-x-hidden">
      <body
        className={`${radiotechnika400.className} ${openSans.className} antialiased overflow-x-hidden`}
      >
        <Header />

        <main className="overflow-x-hidden">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
