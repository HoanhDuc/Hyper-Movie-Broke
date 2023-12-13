import React from "react";
import WatchSection from "@/components/section/WatchSection";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";
import { MovieModel } from "@/models/Movie";
import { EpisodeModel } from "@/models/Episode";

export const generateMetadata = async (
  { searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { name, episodeId } = searchParams;
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
      absolute: `${movieModel.name || "Unknown"} - ${
        episodeDp?.name
      } | ${movieModel.statusTitle} | Hyper Movie`,
    },
    description: `${movieModel?.description || "Unknown"} | Hyper Movie`,
    verification: {
      google:
        "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
    },
    openGraph: {
      title: `${movieModel.name || "Unknown"} | Hyper Movie`,
      description: `${movieModel?.description || "Unknown"} | Hyper Movie`,
      images: [movieModel?.thumbnail, ...prevImages],
    },
    metadataBase: new URL(`https://hypermovie.fun`),
    themeColor: "#000",
  };
};

export default async function page() {
  return <WatchSection />;
}
