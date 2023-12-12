/* eslint-disable @next/next/no-img-element */
"use client";
import "@/components/styles/frame.scss";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieModel } from "@/models/Movie";
import { Button } from "@/components/ui/button";
import { LinkModel } from "@/models/Link";
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
import { getDetailMovie, getPlayMovie } from "@/services/movie";

const WatchComponent:React.FC<any> = () => {
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { movie }: any = await getDetailMovie(name as string);
      setMovieInfo(new MovieModel(movie));
    };
    if (name) fetch()
  }, [name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlayMovie({
          movieId: Number(id),
          episodeId: selectedEpisodeId || movieInfo?.episodes?.[0].id,
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
      `${pathname}?id=${id}&name=${name}&episodeId=${idEp}&server=${server}`
    );
  };

  const handleChangeServer = (item: LinkModel, index: number) => {
    window.scroll({ top: 0, behavior: "smooth" });
    setServerSelected(item);
    router.replace(
      `${pathname}?id=${id}&name=${name}&episodeId=${id}&server=${index}`
    );
  };

  const Episodes: React.FC = () => {
    return (
      <section
        hidden={
          !movieInfo?.episodes?.length || movieInfo?.episodes?.length <= 1
        }
      >
        <p className="font-bold md:text-lg lg:text-xl mb-2">Danh sách tập</p>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {movieInfo?.episodes?.map((item: EpisodeModel, index: number) => (
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

  const Servers: React.FC = () => {
    return (
      <section hidden={!servers?.length || servers?.length <= 1}>
        <p className="font-bold md:text-lg lg:text-xl mb-2">Danh sách nguồn</p>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {servers?.map((item: LinkModel, index: number) => (
            <Button
              key={item.link}
              variant={index === server ? "destructive" : "default"}
              onClick={() => handleChangeServer(item, index)}
            >
              #{index + 1}
            </Button>
          ))}
        </div>
      </section>
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
      {window.location.href && <div className="flex gap-3">
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
      </div>}
      </>
    );
  },[window]);

  return (
    <div className="py-14 lg:py-20 container mx-auto">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-3 lg:gap-5">
          <FrameCustomVideo src={serverSelected?.link} />
          <ShareBlock />
          <Servers />
          <Episodes />
          <MovieInfo />
        </div>
      )}
    </div>
  );
};

export default WatchComponent;
