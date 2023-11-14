"use client";
import HeroBanner from "@/components/common/HeroBanner";
import MovieCard from "@/components/common/MovieCard";
import PlayButton from "@/components/common/PlayButton";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import FacebookChatBox from "@/components/shared/FaceBookChatBox";
import FramerContainer from "@/components/shared/FramerContainer";
import { FADE_RIGHT_ANIMATION_VARIANTS } from "@/constants/animation";
import { mockMovies } from "@/constants/mock";
import { MovieModel } from "@/models/Movie";
import { IMovie } from "@/models/interfaces/MovieInterface";
import { getTopViews } from "@/repositories/movie";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { Records },
        }: any = await axios.get("/api/search");
        setMovies(Records.map((item: IMovie) => new MovieModel(item)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const randomItem = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * movies.length);
    return movies[randomNumber];
  }, [movies]);

  const PopularMovies: React.FC = () => {
    return (
      <div className="container mx-auto">
        <motion.h2
          variants={FADE_RIGHT_ANIMATION_VARIANTS}
          className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
        >
          Most Popular Movies
        </motion.h2>
        <AnimationWaiting>
          <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((item) => (
              <motion.div
                variants={FADE_RIGHT_ANIMATION_VARIANTS}
                key={item.id}
              >
                <MovieCard movieInfo={item} />
              </motion.div>
            ))}
          </div>
        </AnimationWaiting>
      </div>
    );
  };

  return (
    <FramerContainer>
      <div className="min-h-screen flex flex-col gap-10">
        <HeroBanner movieProps={randomItem} />
        <PopularMovies />
        <FacebookChatBox />
      </div>
    </FramerContainer>
  );
}
