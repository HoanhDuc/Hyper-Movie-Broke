import React from "react";
import WatchSection from "@/components/section/WatchSection";
import axios from "axios";
import { Metadata } from "next";
import { MovieModel } from "@/models/Movie";

export const generateMetadata = async ({
  searchParams,
}: any): Promise<Metadata> => {
  const { name } = searchParams;
  const {
    data: { movie },
  }: any = await axios.get(
    `${process.env.NEXT_PUBLIC_API_MOTPHIM}/movie/${name}`
  );
  const movieModel = new MovieModel(movie);
  return {
    title: {
      absolute:`${movieModel.name || "Unknown"} | Hyper Movie`
    },
    description: `${movieModel?.description || "Unknown"} | Hyper Movie`,
    verification: {
      google:
        "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
    },
    openGraph: {
      title: `${movieModel.name || "Unknown"} | Hyper Movie`,
      description: `${movieModel?.description || "Unknown"} | Hyper Movie`,
      images: movieModel?.thumbnail,
    },
    metadataBase: new URL("https://hypermovie.fun"),
    themeColor: "#000",
  };
};

export default async function page() {
  return <WatchSection />;
}
