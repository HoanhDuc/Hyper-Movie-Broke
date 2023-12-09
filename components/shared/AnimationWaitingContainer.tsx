"use client";
import { motion, useInView } from "framer-motion";
import React from "react";

const AnimationWaiting = ({ children }: any) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      viewport={{ once: false }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
export default AnimationWaiting;
