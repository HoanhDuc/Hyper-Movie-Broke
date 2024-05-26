/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MovieModel } from "@/models/Movie";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import YouTube from "react-youtube";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FADE_UP_ANIMATION_VARIANTS } from "@/constants/animation";
import { extractVideoId } from "@/components/helpers/youtube";
import { defaultImg, errorImage } from "@/components/helpers/image";
import PlayButton from "./PlayButton";
import { getDetailMovie } from "@/services/movie";
import Tag from "@/components/ui/tag";

const MovieCard: React.FC<{ movieInfo: MovieModel }> = ({ movieInfo }) => {
  const router = useRouter();
  const [visiblePreviewInfo, setVisiblePreviewInfo] = useState(false);
  const [movieDetail, setMovieDetail] = useState<MovieModel>();
  // const [comingSoonMovie, setComingSoonMovie] = useState<MovieModel[]>();
  // const [trendingMovie, setTrendingMovie] = useState<MovieModel[]>();

  const fetchMovieDetail = async () => {
    try {
      const { movie }: any = await getDetailMovie(movieInfo?.link);
      setMovieDetail(new MovieModel(movie));
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
    router.push(`watch/${movieInfo.link}`);
  };

  // const ComingSoonList: React.FC = () => {
  //   return (
  //     <AnimationWaiting>
  //       <motion.h2
  //         variants={FADE_RIGHT_ANIMATION_VARIANTS}
  //         className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
  //       >
  //         Phim sắp chiếu:
  //       </motion.h2>
  //       <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
  //         {comingSoonMovie?.map((item) => (
  //           <motion.div variants={FADE_RIGHT_ANIMATION_VARIANTS} key={item.id}>
  //             <MovieCard movieInfo={item} />
  //           </motion.div>
  //         ))}
  //       </div>
  //     </AnimationWaiting>
  //   );
  // };

  // const TrendingList: React.FC = () => {
  //   return (
  //     <AnimationWaiting>
  //       <motion.h2
  //         variants={FADE_RIGHT_ANIMATION_VARIANTS}
  //         className="text-lg font-bold md:text-xl lg:text-2xl mb-5"
  //       >
  //         Thịnh hành:
  //       </motion.h2>
  //       <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
  //         {trendingMovie?.map((item) => (
  //           <motion.div variants={FADE_RIGHT_ANIMATION_VARIANTS} key={item.id}>
  //             <MovieCard movieInfo={item} />
  //           </motion.div>
  //         ))}
  //       </div>
  //     </AnimationWaiting>
  //   );
  // };

  return (
    // <Tilt glareEnable glareBorderRadius={"8px"}>
    <div className="relative overflow-hidden" onClick={goToWatch}>
      <div className="cursor-pointer" onClick={openDetail}>
        <img
          src={movieInfo?.poster}
          alt={movieInfo?.name}
          width={0}
          height={300}
          className="w-full h-[300px] object-cover hover:scale-105 transition-all ease-out mb-2  rounded-md shadow-2xl"
        />
        <p className="truncate font-bold text-sm lg:text-base">
          {movieInfo?.name}
        </p>
        <div className="absolute left-0 top-3 p-2 bg-hyper-movie rounded-r-md text-xs md:text-sm">
          <p>{movieInfo.episodeCurrent}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <Tag>{movieInfo.quality}</Tag>
          <Tag>{movieInfo.statusTitle}</Tag>
          <Tag>{`${movieInfo.year}`}</Tag>
          <Tag>
            <div className="flex items-center gap-1">
              {movieInfo.imdbRating}
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
          </Tag>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
// <Dialog open={visiblePreviewInfo} onOpenChange={setVisiblePreviewInfo}>
//   <DialogContent>
//     {movieDetail ? (
//       <div className="flex flex-col gap-3 lg:gap-5 overflow-y-auto">
//         {movieDetail?.trailerYT && (
//           <YouTube
//             videoId={extractVideoId(movieDetail?.trailerYT)}
//             className="w-full mx-auto"
//             opts={{ height: "400", width: "100%" }}
//           />
//         )}
//         <img
//           src={movieInfo?.poster}
//           alt={movieInfo?.name}
//           width={0}
//           height={300}
//           className="w-full h-[300px] object-cover hover:scale-105 transition-all ease-out"
//         />

//         <div className="flex justify-between items-end">
//           <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
//             <p className="font-bold md:text-xl lg:text-2xl mb-3">
//               {movieDetail?.name}
//             </p>
//             <motion.div
//               variants={FADE_UP_ANIMATION_VARIANTS}
//               className="flex gap-5"
//             >
//               <p>
//                 Đã xem:{" "}
//                 <span className="text-green-500">
//                   {movieDetail.viewNumber}
//                 </span>
//               </p>
//               <p>{movieDetail.year}</p>
//               <p>Trong danh sách : {movieDetail.statusTitle}</p>
//             </motion.div>
//           </motion.div>
//           <PlayButton hidden={movieDetail.isTrailer} onClick={goToWatch} />
//         </div>
//         {/*  <motion.p
//               variants={FADE_UP_ANIMATION_VARIANTS}
//               dangerouslySetInnerHTML={{ __html: movieDetail?.description }}
//             >
//               <span className="font-bold">{movieDetail?.name}</span>{" "}
//               {movieDetail?.description}
//             </motion.p>*/}
//         {/* <motion.div
//               variants={FADE_RIGHT_ANIMATION_VARIANTS}
//               className="grid lg:grid-cols-3 gap-3 lg:gap-5"
//             >
//               {movieDetail?.casts?.map((cast: CastModel, idx: number) => (
//                 <div key={idx} className="flex gap-2">
//                   <img
//                     src={cast.avatar || defaultImg}
//                     alt=""
//                     onError={errorImage}
//                     width="auto"
//                     height="auto"
//                     className="rounded-md w-12 h-12 lg:w-16 lg:h-16 object-cover"
//                   />
//                   <div className="text-sm">
//                     <p className="my-2">{cast.name}</p>
//                   </div>
//                 </div>
//               ))}
//             </motion.div> */}
//         {/* <div className="m-3 flex flex-col gap-5">
//               <ComingSoonList />
//               <TrendingList />
//             </div> */}
//       </div>
//     ) : (
//       <Loader />
//     )}
//   </DialogContent>
// </Dialog>;
