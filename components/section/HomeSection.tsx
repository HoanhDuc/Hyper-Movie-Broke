"use client";
import HeroBanner from "@/components/common/HeroBanner";
import MovieCard from "@/components/common/MovieCard";
import FilterMovie from "@/components/content/FilterMovie";
import AnimationWaiting from "@/components/shared/AnimationWaitingContainer";
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
import ContactForm from "@/components/content/ContactUsForm";

export default function Home() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>();
  const [currentParams, setCurrentParams] = useState<any>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [keySearch, setKeySearch] = useState("");

  useEffect(() => {
    fetchData({ page: 1, search: "godzilla" });
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
    fetchData({ ...currentParams, page: pageNumber });
  };

  const onFilter = (params: any) => {
    setPage(1);
    setCurrentParams(params);
    fetchData(params);
    setKeySearch(params?.search || "");
  };

  const MoviesList: React.FC = () => {
    return (
      <div>
        {loading ? (
          <div className="mx-auto flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {
              movies.length ? (
                <div>
                  <AnimationWaiting>
                    <div className="grid grid-cols-2 gap-5 md:gap-7 md:grid-cols-5 lg:grid-cols-5">
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
                    pageSize={pagination?.pageSize}
                    totalPages={pagination?.pageCount}
                    totalItem={pagination?.totalRecords}
                    onChange={onPageChange}
                  />
                </div>
              ) : (
                <div className="mx-auto p-5 border rounded">
                  <p className="text-lg lg:text-xl mb-5">
                    Không có kết quả nào để hiển thị với &quot;
                    <span className="text-hyper-movie">{keySearch}</span>&quot;
                  </p>{" "}
                  Gợi ý:
                  <ul>
                    <li>
                      - Hãy chắc chắn rằng tất cả các từ đều đúng chính tả.
                    </li>
                    <li> - Hãy thử các từ khóa khác nhau.</li>
                    <li> - Thử những từ khóa thông thường hơn.</li>
                  </ul>
                </div>
              )
              // (
              //   <Image
              //     src="/empty.png"
              //     alt="play"
              //     width={500}
              //     height={200}
              //     className="object-cover mx-auto"
              //   />
              // )
            }
          </>
        )}
      </div>
    );
  };

  return (
    <FramerContainer>
      <div className="container mx-auto min-h-screen flex flex-col gap-8 py-10">
        {/* <HeroBanner /> */}
        <FilterMovie onFilter={onFilter} />
        <MoviesList />
        {/* <hr />
        <motion.h1 className="text-center font-bold text-xl md:text-3xl xl:text-4xl">
          Hyper Movie
        </motion.h1>
        <hr /> */}
        {/* <ContactForm /> */}
      </div>
    </FramerContainer>
  );
}
