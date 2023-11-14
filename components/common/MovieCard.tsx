/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { MovieModel } from "@/models/Movie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MovieCard: React.FC<{ movieInfo: MovieModel }> = ({ movieInfo }) => {
  const router = useRouter();
  const [visiblePreviewInfo, setVisiblePreviewInfo] = useState(false);
  return (
    <Link
      href={`watch?id=${movieInfo.id}&name=${movieInfo.link}`}
      className="rounded-md cursor-pointer"
    >
      <img
        src={movieInfo?.poster}
        alt={movieInfo?.name}
        className="w-full h-[100px] md:h-[150px] object-cover rounded-md hover:scale-105 transition-all"
      />
    </Link>
  );
};

export default MovieCard;
