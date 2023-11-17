/* eslint-disable @next/next/no-img-element */
"use client";
import "@/components/styles/frame.scss";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieModel } from "@/models/Movie";
import { Button } from "@/components/ui/button";
import { LinkModel } from "@/models/Link";
import { EpisodeModel } from "@/models/Episode";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import { motion } from "framer-motion";
import {
  FADE_RIGHT_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/constants/animation";
import MovieCard from "@/components/common/MovieCard";
import { CastModel } from "@/models/Cast";
import Loader from "@/components/ui/loader";
import { defaultImg, errorImage } from "@/components/helpers/image";

const WatchMoviePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const vdRef = useRef<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const server = Number(searchParams.get("server")) || 0;
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(
    Number(searchParams.get("episodeId"))
  );
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieModel>();
  const [servers, setServers] = useState<LinkModel[]>();
  const [serverSelected, setServerSelected] = useState<LinkModel>();
  const [comingSoonMovie, setComingSoonMovie] = useState<MovieModel[]>();
  const [trendingMovie, setTrendingMovie] = useState<MovieModel[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          data: { movie, phimSapChieu, trendingMovies },
        }: any = await axios.get(`/api/movie/${name}`);
        setMovieInfo(new MovieModel(movie));
        setComingSoonMovie(
          phimSapChieu?.map((item: any) => new MovieModel(item))
        );
        setTrendingMovie(
          trendingMovies?.map((item: any) => new MovieModel(item))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id && name && !movieInfo) fetchData();
  }, [id, name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get("/api/play/get", {
          params: {
            movieId: id,
            episodeId: selectedEpisodeId || movieInfo?.episodes[0].id,
          },
        });
        setLoading(false);
        setServerSelected(new LinkModel(data?.[0]));
        setServers(data.map((item: any) => new LinkModel(item)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (movieInfo) fetchData();
  }, [movieInfo, selectedEpisodeId]);

  const handleChangeEpisode = (idEp: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    setSelectedEpisodeId(idEp);
    router.replace(
      `${pathname}?id=${id}&name=${name}&episodeId=${idEp}&server=${server}`,
      {}
    );
  };

  const handleChangeServer = (item: LinkModel, index: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    setServerSelected(item);
    router.replace(
      `${pathname}?id=${id}&name=${name}&episodeId=${id}&server=${index}`
    );
  };

  const Episodes = () => {
    return (
      <section
        hidden={
          !movieInfo?.episodes?.length || movieInfo?.episodes?.length <= 1
        }
      >
        <p className="font-bold md:text-lg lg:text-xl mb-2">Episodes:</p>
        <div className="flex flex-wrap gap-3">
          {movieInfo?.episodes.map((item: EpisodeModel, index: number) => (
            <Button
              key={item.id}
              variant={
                (
                  selectedEpisodeId
                    ? item.id === selectedEpisodeId
                    : index === 0
                )
                  ? "destructive"
                  : "default"
              }
              onClick={() => handleChangeEpisode(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </section>
    );
  };

  const Servers = () => {
    return (
      <section hidden={!servers?.length || servers?.length <= 1}>
        <p className="font-bold md:text-lg lg:text-xl mb-2">Server:</p>
        <div className="flex flex-wrap gap-3">
          {servers?.map((item: LinkModel, index: number) => (
            <Button
              key={item.link}
              variant={index === server ? "destructive" : "default"}
              onClick={() => handleChangeServer(item, index)}
            >
              {item.serverName}
            </Button>
          ))}
        </div>
      </section>
    );
  };

  const ComingSoonList: React.FC = () => {
    return (
      <AnimationWaiting>
        <motion.h2
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
        >
          Coming Soon Movies:
        </motion.h2>
        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {comingSoonMovie?.map((item) => (
            <motion.div variants={FADE_RIGHT_ANIMATION_VARIANTS} key={item.id}>
              <MovieCard movieInfo={item} />
            </motion.div>
          ))}
        </div>
      </AnimationWaiting>
    );
  };

  const TrendingList: React.FC = () => {
    return (
      <AnimationWaiting>
        <motion.h2
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
        >
          Trending Movies:
        </motion.h2>
        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 lg:grid-cols-6">
          {trendingMovie?.map((item) => (
            <motion.div variants={FADE_RIGHT_ANIMATION_VARIANTS} key={item.id}>
              <MovieCard movieInfo={item} />
            </motion.div>
          ))}
        </div>
      </AnimationWaiting>
    );
  };

  const MovieInfo: React.FC = () => {
    return (
      <div className="lg:text-xl flex flex-col gap-3 lg:gap-5 overflow-y-auto">
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <p className="font-bold md:text-2xl lg:text-4xl mb-3">
            {movieInfo?.name}
          </p>
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex gap-5"
          >
            <p>
              Watched:{" "}
              <span className="text-green-500">{movieInfo?.viewNumber}</span>
            </p>
            <p>{movieInfo?.year}</p>
            <p>{movieInfo?.statusTitle}</p>
          </motion.div>
        </motion.div>
        <motion.p variants={FADE_UP_ANIMATION_VARIANTS}>
          Đây {movieInfo?.description}
        </motion.p>
        <motion.div
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5"
        >
          {movieInfo?.casts?.map((cast: CastModel, idx: number) => (
            <div key={idx} className="flex gap-2">
              <img
                src={cast.avatar || defaultImg}
                alt=""
                onError={errorImage}
                className="rounded-md w-12 h-12 lg:w-16 lg:h-16 object-cover"
              />
              <div className="text-md">
                <p className="mb-1">Name: {cast.name}</p>
                <p>Age: Unknown</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="py-14 container mx-auto">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-3 lg:gap-5">
          <ReactHlsPlayer
            playerRef={vdRef}
            src={serverSelected?.link || ""}
            autoPlay={Boolean(serverSelected?.link)}
            controls={true}
            width="100%"
            height="auto"
            className="mb-3 lg:mb-5 max-h-[80vh] rounded-xl cursor-pointer overflow-hidden shadow-xl"
          />
          <Servers />
          <Episodes />
          <MovieInfo />
          <ComingSoonList />
          <TrendingList />
        </div>
      )}
    </div>
  );
};
export default WatchMoviePage;
