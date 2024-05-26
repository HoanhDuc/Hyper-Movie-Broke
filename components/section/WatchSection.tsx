/* eslint-disable @next/next/no-img-element */
"use client";
import "@/components/styles/frame.scss";
import React, { useCallback, useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from "next/navigation";
import { MovieModel } from "@/models/Movie";
import { Button } from "@/components/ui/button";
import { EpisodeModel } from "@/models/Episode";
import { motion } from "framer-motion";
import {
  FADE_RIGHT_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/constants/animation";
import { CastModel } from "@/models/Cast";
import Loader from "@/components/ui/loader";
import { defaultImg, errorImage } from "@/components/helpers/image";
import FrameCustomVideo from "@/components/common/FrameCustomVideo";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "next-share";
import { getDetailMovie } from "@/services/movie";
import { ServerDaum } from "@/models/interfaces/MovieInterface";

const WatchComponent: React.FC<any> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { name } = useParams();
  const searchParams = useSearchParams();
  const server = Number(searchParams.get("server")) || 0;
  const [loading, setLoading] = useState(false);
  const [movieInfo, setMovieInfo] = useState<MovieModel>();
  const [servers, setServers] = useState<ServerDaum[]>();
  const [serverSelected, setServerSelected] = useState<ServerDaum>();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { movie }: any = await getDetailMovie(name as string);
      setMovieInfo(new MovieModel(movie));
      setServers(new MovieModel(movie).episodes[0].serverData);
      setLoading(false);
    };
    if (name) fetch();
  }, [name]);

  useEffect(() => {
    if (movieInfo?.id) {
      if (searchParams.get("episodeId")) {
        setServerSelected(
          movieInfo.episodes[0].serverData[
            Number(searchParams.get("episodeId"))
          ]
        );
        return;
      }
      setServerSelected(movieInfo.episodes[0].serverData[0]);
      console.log(movieInfo.episodes[0].serverData[0]);
    }
  }, [movieInfo]);

  const handleChangeEpisode = (idEp: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    setServerSelected(movieInfo?.episodes[0].serverData[idEp]);
    router.replace(`${pathname}?episodeId=${idEp}`);
  };

  const handleChangeServer = (item: ServerDaum, index: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    setServerSelected(item);
    router.replace(
      `${pathname}?episodeId=${Number(
        searchParams.get("episodeId")
      )}&server=${index}`
    );
  };

  const Episodes: React.FC = () => {
    return (
      <section
        className="max-h-[300px] overflow-auto"
        hidden={!servers?.length || servers?.length <= 1}
      >
        <p className="font-bold md:text-lg lg:text-xl mb-2">
          Danh sách tập phim
        </p>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {servers?.map((item: ServerDaum, index: number) => (
            <Button
              key={item.slug}
              variant={
                item.slug === serverSelected?.slug ? "destructive" : "default"
              }
              onClick={() => handleChangeEpisode(index)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </section>
    );
  };

  const Servers: React.FC = () => {
    return (
      <section
        hidden={
          !movieInfo?.episodes?.length || movieInfo?.episodes?.length <= 0
        }
      >
        <p className="font-bold md:text-lg lg:text-xl mb-2">
          Servers (Developing...)
        </p>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {movieInfo?.episodes?.map((item: EpisodeModel, index: number) => (
            <Button key={item.serverName}>{item.serverName}</Button>
          ))}
        </div>
      </section>
    );
  };

  const MovieInfo: React.FC = () => {
    return (
      <div className="lg:text-xl flex flex-col gap-3 lg:gap-5 overflow-y-auto">
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <h1 className="font-bold md:text-2xl lg:text-4xl mb-3">
            {movieInfo?.name}
          </h1>
          <motion.div
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex gap-5"
          >
            <p>
              Đã xem:{" "}
              <span className="text-green-500">{movieInfo?.viewNumber}</span>
            </p>
            <p>{movieInfo?.year}</p>
            <p>Đang phát sóng: {movieInfo?.statusTitle}</p>
          </motion.div>
        </motion.div>
        <motion.p variants={FADE_UP_ANIMATION_VARIANTS}>
          <span className="font-bold">{movieInfo?.name}</span>{" "}
          {movieInfo?.description}
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
              <div className="text-sm md:text-base">
                <p className="my-2">{cast.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  const ShareBlock: React.FC = useCallback(() => {
    return (
      <>
        {movieInfo && (
          <div className="flex gap-3">
            <p className="text-xl font-bold">Chia sẻ: </p>
            <FacebookShareButton
              url={window.location.href}
              quote={movieInfo?.name}
              hashtag={"#hypermovie"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton
              url={window.location.href}
              title={movieInfo?.name}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <TwitterShareButton
              url={window.location.href}
              title={movieInfo?.name}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <FacebookMessengerShareButton
              url={window.location.href}
              appId="4639220812794134"
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </div>
        )}
      </>
    );
  }, [movieInfo]);

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="">
          <FrameCustomVideo src={serverSelected?.link_m3u8} />
          <div className="py-10 container mx-auto flex flex-col gap-3 lg:gap-5">
            <ShareBlock />
            <MovieInfo />
            <Servers />
            <Episodes />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchComponent;
