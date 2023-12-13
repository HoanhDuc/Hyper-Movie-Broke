import HomeSection from "@/components/section/HomeSection";
import { Metadata } from "next";

const title = "Hyper Movie | Xem phim miễn phí | Chia sẻ API phim";
const description =
  "Hyper Movie - Free and Fast Update Movies. Xem phim miễn phí Full HD. Chia sẻ API phim miễn phí";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Đức" }, { name: "Đức", url: "https://ducnh.io.vn" }],
  creator: "Hoành Đức",
  verification: {
    google:
      "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
  },
  openGraph: {
    title,
    description,
    images: [{ url: "/opengraph-image.png" }],
    siteName: "Hyper Movie",
    url: "https://hypermovie.fun"
  },
  metadataBase: new URL("https://hypermovie.fun"),
  themeColor: "#000",
};

export default async function page() {
  return <HomeSection />;
}
