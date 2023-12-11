import React from "react";
import WatchComponent from "./components/WatchComponent";
import axios from "axios";
import { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: any): Promise<Metadata> => {
  const { name } = searchParams;
  const {
    data: { movie },
  }: any = await axios.get(
    `${process.env.NEXT_PUBLIC_API_MOTPHIM}/movie/${name}`
  );
  return {
    title: `${movie?.Name || "Unknown"} | Hyper Movie`,
    description: `${movie?.Description || "Unknown"} | Hyper Movie`,
    verification: {
      google:
        "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
    },
    openGraph: {
      title: `${movie?.Name || "Unknown"} | Hyper Movie`,
      description: `${movie?.Description || "Unknown"} | Hyper Movie`,
      images: [{ url: "/opengraph-image.png" }],
    },
    metadataBase: new URL("https://hypermovie.fun"),
    themeColor: "#000",
  };
};

export default function page() {
  return <WatchComponent />;
}
