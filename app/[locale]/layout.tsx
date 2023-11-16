import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/shared/MainNav";
import Footer from "@/components/shared/footer";
import { NextIntlClientProvider } from "next-intl";
const inter = Inter({ subsets: ["latin"] });

const title = "NextMovie";
const description = "NextMovie - Free and Fast Update Movies";

export const metadata: Metadata = {
  title,
  description,
  verification: {
    google:
      "google-site-verification=Y5OPaw_tefRfLqkRVuLeOFUahubeU2A7VcL2IpAAFfs",
  },
  openGraph: {
    title,
    description,
  },
  // metadataBase: new URL("https://ducnhse.vercel.app"),
  themeColor: "#000",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MainNav />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
