/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MovieModel } from "@/models/Movie";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import YouTube from "react-youtube";
import Loader from "@/components/ui/loader";

const MovieCard: React.FC<{ movieInfo: MovieModel }> = ({ movieInfo }) => {
  const [visiblePreviewInfo, setVisiblePreviewInfo] = useState(false);
  const [movieDetail, setMovieDetail] = useState<MovieModel>();

  const fetchMovieDetail = async () => {
    try {
      const {
        data: { movie },
      }: any = await axios.get(`/api/movie/${movieInfo.link}`);
      setMovieDetail(new MovieModel(movie));
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

  return (
    <section>
      <div
        // href={`watch?id=${movieInfo.id}&name=${movieInfo.link}`}
        className="cursor-pointer"
        onClick={openDetail}
      >
        <div className="relative hover:scale-105 transition-all">
          <img
            src={movieInfo?.poster}
            alt={movieInfo?.name}
            className="w-full h-[100px] md:h-[150px] object-cover rounded-md"
          />
          <div className="absolute left-0 top-3 p-2 bg-red-500 rounded-r-md text-xs md:text-sm">
            {movieInfo.statusTitle}
          </div>
        </div>
      </div>
      <Dialog open={visiblePreviewInfo} onOpenChange={setVisiblePreviewInfo}>
        <DialogContent>
          {movieDetail ? (
            <div className="flex flex-col gap-3 overflow-y-auto">
              <YouTube
                videoId={extractVideoId(movieDetail?.trailerYT)}
                className="w-full mx-auto"
                opts={{ height: "400", width: "100%" }}
              />
              <p className="font-bold md:text-xl lg:text-2xl">
                {movieDetail?.name}
              </p>
              <p>{movieDetail?.description}</p>
              <p>{movieDetail?.description}</p>
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
