"use client";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useState } from "react";

const AnimationWaiting = ({ children }: any) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  const [show, setShow] = useState(false); 

  useEffect(() => {
    if (isInView) setShow(true);
  }, [isInView]); 

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={show && "show"}
      viewport={{ once: false }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
export default AnimationWaiting;
