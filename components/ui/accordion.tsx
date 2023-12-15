"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ children, expanded, header, setExpanded }: any) => {
  return (
    <div className="shadow-md rounded-md overflow-hidden">
      <motion.header
        initial={false}
        animate={{ backgroundColor: "#DC2626" }}
        onClick={() => setExpanded(!expanded)}
      >
        {header}
      </motion.header>
      <motion.section
        initial="open"
        animate={expanded ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default Accordion;
