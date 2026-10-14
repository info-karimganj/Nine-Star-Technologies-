import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { constructMetadata } from "@/seo/metadata";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/seo/config";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { i18n } from "@/i18n/config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const instant = false;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return constructMetadata({
    title: `${dict.home.hero.title} | ${siteConfig.name}`,
    description: dict.home.hero.description,
    url: `${siteConfig.url}/${lang}`,
  });
}

export default async function RootLayout(props: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang as Locale);
  return (
    <html
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${plusJakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationJsonLd />
        <Header dict={dict} />
        <main className="flex-1">
          {props.children}
        </main>
        <Footer dict={dict} />
        <CookieConsentBanner lang={lang} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
