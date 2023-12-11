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
import { useEffect, useState } from "react";
import Pagination from "@/components/common/pagination";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { PaginationModel } from "@/models/Pagination";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>();
  const [currentParams, setCurrentParams] = useState<any>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (params?: any) => {
    setLoading(true);
    try {
      const {
        data: { records, pagination },
      }: any = await axios.get("/api/search", { params });
      setMovies(records.map((item: IMovie) => new MovieModel(item)));
      setPagination(new PaginationModel(pagination));
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
    // <FramerContainer>
    //   <div className="min-h-screen flex flex-col gap-10">
    //     <HeroBanner />
    //     <div className="flex flex-col lg:flex-row gap-10 justify-center">
    //       <iframe
    //         src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fweb.facebook.com%2Fthocuong.le.3%2Fposts%2Fpfbid0tMD97sZ2Sa1MoZGLQigTEqAdHDrC4pTrbNpzFXehjbn8vmLxH6mRRJy6djgcU6Hsl"
    //         width="300"
    //         height="600"
    //         allowFullScreen={true}
    //         allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    //         className="lg:sticky top-16 mx-5"
    //       ></iframe>
    //       <div className="flex flex-col gap-10">
    //         <FilterMovie onFilter={onFilter} />
    //         <MoviesList />
    //       </div>
    //     </div>
    //     <FacebookChatBox />
    //   </div>
    // </FramerContainer>
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
