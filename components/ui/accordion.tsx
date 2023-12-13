import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ controlBlock, children }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <motion.div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full shadow-md"
      >
        {controlBlock}
      </motion.div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration:  0.3,
              },
            }}
            exit={{
              opacity: 0,
              y: "-10%",
              transition: {
                duration: 0.3,
              },
            }}
          >
           {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default memo(Accordion);
