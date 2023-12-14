import React from "react";
import WatchSection from "@/components/section/WatchSection";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";
import { MovieModel } from "@/models/Movie";
import { EpisodeModel } from "@/models/Episode";

export const generateMetadata = async (
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { name } = params;
  const { episodeId } = searchParams;
  const prevImages = (await parent).openGraph?.images || [];
  const {
    data: { movie },
  }: any = await axios.get(
    `${process.env.NEXT_PUBLIC_API_MOTPHIM}/movie/${name}`
  );
  const movieModel = new MovieModel(movie);
  const episodeDp = episodeId
    ? movieModel?.episodes?.find(
        (item: EpisodeModel) => item.id === Number(episodeId)
      )
    : { name: movieModel?.episodes?.[0]?.name || "Tập 1" };
  return {
    title: {
      absolute: `Xem ${movieModel?.seoTitle} - ${episodeDp?.name} | Hyper Movie`,
    },
    description: `${movieModel?.seoDescription}`,
    verification: {
      google:
        "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
    },
    openGraph: {
      title: `Xem ${movieModel?.seoTitle} - ${episodeDp?.name} | Hyper Movie`,
      description: `${movieModel?.seoDescription}`,
      images: [movieModel?.thumbnail, ...prevImages],
      siteName: "Hyper Movie",
      url: `https://hypermovie.fun/watch/${name}`,
    },
    metadataBase: new URL(`https://hypermovie.fun`),
    themeColor: "#000",
  };
};

export default async function page() {
  return <WatchSection />;
}
