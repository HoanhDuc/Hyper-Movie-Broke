"use client";
import axios from "axios";
import HeroBanner from "@/components/common/HeroBanner";
import MovieCard from "@/components/common/MovieCard";
import FilterMovie from "@/components/content/FilterMovie";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import FacebookChatBox from "@/components/shared/FaceBookChatBox";
import FramerContainer from "@/components/shared/FramerContainer";
import { FADE_RIGHT_ANIMATION_VARIANTS } from "@/constants/animation";
import { MovieModel } from "@/models/Movie";
import { IMovie } from "@/models/interfaces/MovieInterface";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/common/Pagination";

export default function Home() {
  const [movies, setMovies] = useState<MovieModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (params?: any) => {
    try {
      const {
        data: { Records },
      }: any = await axios.get("/api/search", { params });
      setMovies(Records.map((item: IMovie) => new MovieModel(item)));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFilter = (params: any) => {
    fetchData(params);
  };

  const randomItem = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * movies.length);
    return movies[randomNumber];
  }, [movies]);

  const MoviesList: React.FC = () => {
    return (
      <div className="container mx-auto flex flex-col gap-5">
        <div>
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
          <Pagination totalPages={10} />
        </div>
      </div>
    );
  };

  return (
    <FramerContainer>
      <div className="min-h-screen flex flex-col gap-10">
        <HeroBanner movieProps={randomItem} />
        <FilterMovie onFilter={onFilter} />
        <MoviesList />
        <FacebookChatBox />
      </div>
    </FramerContainer>
  );
}
