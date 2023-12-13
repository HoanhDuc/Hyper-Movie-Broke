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
      <motion.div
        className="py-2 px-4 flex justify-between items-center gap-3 bg-hyper-movie rounded-md hover:scale-110 transition-all cursor-pointer"
        onClick={() => {
          setLoading(true);
          onClick();
        }}
      >
        <p>Play Now</p>
        <motion.div
          animate={{ rotate: loading ? 360 : 0 }}
          transition={{ ease: "linear", duration: 0.5, repeat: Infinity }}
        >
            <Image
              hidden={hidden}
              src="/play-icon.png"
              alt="play"
              width={40}
              height={0}
              className="object-cover rounded-full cursor-pointer"
            />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlayButton;
