/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MovieModel } from "@/models/Movie";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import YouTube from "react-youtube";
import Loader from "@/components/ui/loader";
import { CastModel } from "@/models/Cast";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FADE_RIGHT_ANIMATION_VARIANTS } from "@/constants/animation";

const MovieCard: React.FC<{ movieInfo: MovieModel }> = ({ movieInfo }) => {
  const router = useRouter();
  const [visiblePreviewInfo, setVisiblePreviewInfo] = useState(false);
  const [movieDetail, setMovieDetail] = useState<MovieModel>();
  const [comingSoonMovie, setComingSoonMovie] = useState<MovieModel[]>();
  const [trendingMovie, setTrendingMovie] = useState<MovieModel[]>();

  const fetchMovieDetail = async () => {
    try {
      const {
        data: { movie, phimSapChieu, trendingMovies },
      }: any = await axios.get(`/api/movie/${movieInfo.link}`);
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

  const extractVideoId = (youtubeUrl: string | undefined) => {
    if (!youtubeUrl) return "null";
    const pattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(pattern);
    if (match) return match[1] as string;
  };

  const openDetail = async () => {
    setVisiblePreviewInfo(true);
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
          Coming Soon Movies:
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
            Trending Movies:
          </motion.h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {trendingMovie?.map((item) => (
              <motion.div
                variants={FADE_RIGHT_ANIMATION_VARIANTS}
                key={item.id}
              >
                <MovieCard movieInfo={item} />
              </motion.div>
            ))}
          </div>
        </AnimationWaiting>
      );
    };

  return (
    <section>
      <div className="cursor-pointer" onClick={openDetail}>
        <div className="relative hover:scale-105 transition-all">
          <img
            src={movieInfo?.poster}
            alt={movieInfo?.name}
            className="w-full h-[200px] md:h-[300px] object-cover rounded-md"
          />
          <div className="absolute left-0 top-3 p-2 bg-red-500 rounded-r-md text-xs md:text-sm">
            <p>{movieInfo.statusTitle}</p>
          </div>
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

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold md:text-xl lg:text-2xl mb-3">
                    {movieDetail?.name}
                  </p>
                  <div className="flex gap-5">
                    <p>
                      Watched:{" "}
                      <span className="text-green-500">
                        {movieDetail.viewNumber}
                      </span>
                    </p>
                    <p>{movieDetail.year}</p>
                    <p>{movieDetail.statusTitle}</p>
                  </div>
                </div>
                <Image
                  hidden={movieDetail.isTrailer}
                  src="/play-btn.png"
                  alt="play"
                  width={70}
                  height={0}
                  className="object-cover rounded-full hover:scale-110 transition-all mr-1 cursor-pointer"
                  onClick={goToWatch}
                />
              </div>
              <p>Đây {movieDetail?.description}</p>
              <div className="grid lg:grid-cols-3 gap-3 lg:gap-5">
                {movieDetail?.casts?.map((cast: CastModel, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <img
                      src={cast.avatar}
                      alt=""
                      className="rounded-md w-12 h-12 lg:w-16 lg:h-16 object-cover"
                    />
                    <div className="text-sm">
                      <p className="mb-1">Name: {cast.name}</p>
                      <p>Age: Unknown</p>
                    </div>
                  </div>
                ))}
              </div>
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
    </section>
  );
};

export default MovieCard;
