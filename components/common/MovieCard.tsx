/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MovieModel } from "@/models/Movie";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import YouTube from "react-youtube";
import Loader from "@/components/ui/loader";
import { CastModel } from "@/models/Cast";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FADE_RIGHT_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/constants/animation";
import { extractVideoId } from "@/components/helpers/youtube";
import { defaultImg, errorImage } from "@/components/helpers/image";
import PlayButton from "./PlayButton";
import { getDetailMovie } from "@/services/movie";

const MovieCard: React.FC<{ movieInfo: MovieModel }> = ({ movieInfo }) => {
  const router = useRouter();
  const [visiblePreviewInfo, setVisiblePreviewInfo] = useState(false);
  const [movieDetail, setMovieDetail] = useState<MovieModel>();
  const [comingSoonMovie, setComingSoonMovie] = useState<MovieModel[]>();
  const [trendingMovie, setTrendingMovie] = useState<MovieModel[]>();

  const fetchMovieDetail = async () => {
    try {
      const { movie, phimSapChieu, trendingMovies }: any = await getDetailMovie(
        movieInfo?.link
      );
      setMovieDetail(new MovieModel(movie));
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

  const openDetail = async () => {
    setVisiblePreviewInfo(true);
    if (movieDetail) return;
    await fetchMovieDetail();
  };

  const goToWatch = () => {
    router.push(`watch?id=${movieInfo.id}&name=${movieInfo.link}`);
  };

  const ComingSoonList: React.FC = () => {
    return (
      <AnimationWaiting>
        <motion.h2
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
        >
          Phim sắp chiếu:
        </motion.h2>
        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
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
          Thịnh hành:
        </motion.h2>
        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {trendingMovie?.map((item) => (
            <motion.div variants={FADE_RIGHT_ANIMATION_VARIANTS} key={item.id}>
              <MovieCard movieInfo={item} />
            </motion.div>
          ))}
        </div>
      </AnimationWaiting>
    );
  };

  return (
    // <Tilt glareEnable glareBorderRadius={"8px"}>
    <div className="relative overflow-hidden rounded-md">
      <div className="cursor-pointer" onClick={openDetail}>
        <img
          src={movieInfo?.poster}
          alt={movieInfo?.name}
          width={0}
          height={300}
          className="w-full h-[300px] object-cover hover:scale-105 transition-all ease-out"
        />
        <div className="absolute left-0 top-3 p-2 bg-red-600 rounded-r-md text-xs md:text-sm">
          <p>{movieInfo.statusTitle}</p>
        </div>
      </div>
      <Dialog open={visiblePreviewInfo} onOpenChange={setVisiblePreviewInfo}>
        <DialogContent>
          {movieDetail ? (
            <div className="flex flex-col gap-3 lg:gap-5 overflow-y-auto">
              {movieDetail?.trailerYT && (
                <YouTube
                  videoId={extractVideoId(movieDetail?.trailerYT)}
                  className="w-full mx-auto"
                  opts={{ height: "400", width: "100%" }}
                />
              )}

              <div className="flex justify-between items-end">
                <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                  <p className="font-bold md:text-xl lg:text-2xl mb-3">
                    {movieDetail?.name}
                  </p>
                  <motion.div
                    variants={FADE_UP_ANIMATION_VARIANTS}
                    className="flex gap-5"
                  >
                    <p>
                      Đã xem:{" "}
                      <span className="text-green-500">
                        {movieDetail.viewNumber}
                      </span>
                    </p>
                    <p>{movieDetail.year}</p>
                    <p>Đang phát sóng: {movieDetail.statusTitle}</p>
                  </motion.div>
                </motion.div>
                <PlayButton
                  hidden={movieDetail.isTrailer}
                  onClick={goToWatch}
                />
              </div>
              <motion.p variants={FADE_UP_ANIMATION_VARIANTS}>
                <span className="font-bold">{movieDetail?.name}</span>{" "}
                {movieDetail?.description}
              </motion.p>
              <motion.div
                variants={FADE_RIGHT_ANIMATION_VARIANTS}
                className="grid lg:grid-cols-3 gap-3 lg:gap-5"
              >
                {movieDetail?.casts?.map((cast: CastModel, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <img
                      src={cast.avatar || defaultImg}
                      alt=""
                      onError={errorImage}
                      width="auto"
                      height="auto"
                      className="rounded-md w-12 h-12 lg:w-16 lg:h-16 object-cover"
                    />
                    <div className="text-sm">
                      <p className="my-2">{cast.name}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <div className="m-3 flex flex-col gap-5">
                <ComingSoonList />
                <TrendingList />
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieCard;
