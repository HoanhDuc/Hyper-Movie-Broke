import "./globals.scss";
import { Sawarabi_Gothic } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/shared/MainNav";
import Footer from "@/components/shared/footer";
import { NextIntlClientProvider } from "next-intl";
const font = Sawarabi_Gothic({weight:"400",subsets:["latin"], display:'swap' });

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
      <body className={`${font.className} bg-[url('/background.png')] bg-fixed bg-cover`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
