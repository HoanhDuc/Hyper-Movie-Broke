import React from "react";
import WatchSection from "@/components/section/WatchSection";
import axios from "axios";
import Head from "next/head"; // Import Metadata from "next/head"
import { MovieModel } from "@/models/Movie";
import { Metadata } from "next";

export const generateMetadata = async ({ searchParams }: any): Promise<Metadata> => {
  try {
    const { name } = searchParams;
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_MOTPHIM}/movie/${name}`);
    const movieModel = new MovieModel(data.movie);

    return {
      title: `${movieModel.name || "Unknown"}`,
      description: `${movieModel?.description || "Unknown"}`,
      verification: {
        google: "google-site-verification=6GjheYtUtr7MSz-zSwn5RdE-7bai55g6u34j6TWzOog",
      },
      openGraph: {
        title: `${movieModel.name || "Unknown"}`,
        description: `${movieModel?.description || "Unknown"}`,
        images: [{ url: movieModel?.thumbnail }],
      },
      metadataBase: new URL("https://hypermovie.fun"),
      themeColor: "#000",
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    // Return a default metadata in case of an error
    return {
      title: "...",
      description: "Default Description",
      verification: {},
      openGraph: {
        title: "Default Title",
        description: "Default Description",
        images: [{ url: "default_image_url" }],
      },
      metadataBase: new URL("https://hypermovie.fun"),
      themeColor: "#000",
    };
  }
};

export async function getStaticProps({searchParams}: any) {
  const metadata = await generateMetadata({
    searchParams,
  });

  return {
    props: {
      metadata,
    },
  };
}

export default function Page({ metadata }: any) {
  return (
    <>
      <Head>
        <title>{metadata?.title} | Hyper Movie</title>
      </Head>
      <WatchSection />
    </>
  );
}
