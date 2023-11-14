import Link from "next/link";
import React from "react";

interface PlayButtonProps {
  movieId?: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {

  return (
    <Link
      href={`watch/${movieId}`}
      className="bannerButton bg-white text-black px-5 py-3 rounded-lg"
    >
      Play
    </Link>
  );
};

export default PlayButton;
