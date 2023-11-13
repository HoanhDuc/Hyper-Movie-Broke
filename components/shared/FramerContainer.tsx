import React from "react";
import { motion, useInView } from "framer-motion";

function FramerContainer({ children }: any) {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      viewport={{ once: false }}
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default FramerContainer;
