/* eslint-disable react/jsx-no-undef */
"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
interface PlayButtonProps {
  hidden?: boolean;
  onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ hidden, onClick }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-2">
      {loading ? (
        <div className="w-fit">
          <span className="loader"></span>
        </div>
      ) : (
        <motion.div
          animate={{ scale: 1.1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Image
            hidden={hidden}
            src="/play-btn.png"
            alt="play"
            width={70}
            height={0}
            className="object-cover rounded-full cursor-pointer"
            onClick={() => {
              setLoading(true);
              onClick();
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default PlayButton;
