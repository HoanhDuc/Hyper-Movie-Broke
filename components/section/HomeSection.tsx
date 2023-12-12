"use client";
import HeroBanner from "@/components/common/HeroBanner";
import MovieCard from "@/components/common/MovieCard";
import FilterMovie from "@/components/content/FilterMovie";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
import FacebookChatBox from "@/components/shared/FaceBookChatBox";
import FramerContainer from "@/components/shared/FramerContainer";
import { FADE_RIGHT_ANIMATION_VARIANTS } from "@/constants/animation";
import { MovieModel } from "@/models/Movie";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Pagination from "@/components/common/pagination";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { PaginationModel } from "@/models/Pagination";
import { getListMovies } from "@/services/movie";

export default function Home() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>();
  const [currentParams, setCurrentParams] = useState<any>({ orderBy: "Year" });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   fetchData({ orderBy: "Year" });
  }, []);

  const fetchData = async (params?: any) => {
    setLoading(true);
    try {
      const { records, pagination }: any = await getListMovies(params);
     setMovies(records);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
    fetchData({ ...currentParams, pageNumber: pageNumber });
  };

  const onFilter = (params: any) => {
    setPage(1);
    setCurrentParams(params);
    fetchData(params);
  };

  const MoviesList: React.FC = () => {
    return (
      <div className="container mx-auto flex flex-col gap-5">
        <motion.h1 className="text-lg font-bold md:text-xl lg:text-2xl">
          Hyper Movies List
        </motion.h1>
        {loading ? (
          <div className="mx-auto">
            <Loader />
          </div>
        ) : (
          <>
            {movies.length ? (
              <div>
                <AnimationWaiting>
                  <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-6">
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
                <Pagination
                  currentPage={page}
                  // pageSize={pagination?.pageSize}
                  totalPages={pagination?.pageCount}
                  totalItem={pagination?.totalRecords}
                  onChange={onPageChange}
                />
              </div>
            ) : (
              <Image
                src="/empty.png"
                alt="play"
                width={500}
                height={200}
                className="object-cover mx-auto"
              />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <FramerContainer>
      <div className="min-h-screen flex flex-col gap-10">
        <HeroBanner />
        <FilterMovie onFilter={onFilter} />
        <MoviesList />
        <FacebookChatBox />
      </div>
    </FramerContainer>
  );
}
