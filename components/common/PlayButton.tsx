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
          transition={{
       
          }}
        >
          <Image
            hidden={hidden}
            src="/play-btn.gif"
            alt="play"
            width={55}
            height={0}
            className="object-scale-down rounded-full cursor-pointer"
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
