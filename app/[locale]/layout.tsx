import "./globals.scss";
import type { Metadata } from "next";
import { Sawarabi_Gothic } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/shared/MainNav";
import Footer from "@/components/shared/footer";
import { NextIntlClientProvider } from "next-intl";
const font = Sawarabi_Gothic({weight:"400",subsets:["latin"], display:'swap' });

const title = "Hyper Movie | Xem phim miễn phí | Chia sẻ API phim";
const description = "Hyper Movie - Free and Fast Update Movies. Xem phim miễn phí Full HD. Chia sẻ API phim miễn phí";

export const metadata: Metadata = {
  title,
  description,
  authors: [
    { name: "Đức" },
    { name: "Đức", url: "https://ducnh.io.vn" },
  ],
  creator: "Hoành Đức",
  verification: {
    google:
      "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
  },
  openGraph: {
    title,
    description,
    images: [{ url: "/opengraph-image.png" }],
  },
  metadataBase: new URL("https://hypermovie.fun"),
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
      <body className={font.className}>
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
