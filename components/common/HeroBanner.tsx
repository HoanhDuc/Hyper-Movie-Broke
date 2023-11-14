/* eslint-disable @next/next/no-img-element */
"use client";
import { MovieModel } from "@/models/Movie";
import { motion } from "framer-motion";
import { FADE_RIGHT_ANIMATION_VARIANTS } from "@/constants/animation";
import PlayButton from "@/components/common/PlayButton";
import { useEffect, useState } from "react";
import axios from "axios";

function Banner({ movieProps }: { movieProps: MovieModel }) {
  // const [movie, setMovie] = useState<MovieModel>();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {
  //         data: { movie },
  //       }: any = await axios.get(`/api/movie/${movieProps.link}`);
  //       const movieModel = new MovieModel(movie);
  //       setMovie(movieModel);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   if (movieProps) {
  //     fetchData();
  //   }
  // }, [movieProps]);

  return (
    <div className="relative w-full">
      <img
        src="https://www.techspot.com/images2/news/bigimage/2022/02/2022-02-15-image-28.jpg"
        alt=""
        width="100%"
        className="object-cover max-h-[80vh]"
      />
      {/* <div className="absolute top-[30%]  lg:max-w-2xl left-10 hidden md:block">
        <motion.h2
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="text-2xl font-bold md:text-3xl lg:text-5xl mb-5"
        >
          {movie?.name}
        </motion.h2>
        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl mb-5">
          {movie?.description}
        </p>
        <div className="flex space-x-3">
          <PlayButton movieId={movie?.id} />
          <button className="bannerButton bg-[gray]/70 px-5 py-3 rounded-lg">
            More Info
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Banner;