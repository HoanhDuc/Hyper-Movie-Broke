"use client";
import React, { useEffect, useState } from "react";
import ModeToggle from "@/components/shared/ModeToggle";
import { motion } from "framer-motion";
import LanguageSwitcher from "../switch-language/SwitcherLanguage";

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-2xl border-b" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.25 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-end p-2 lg:px-8"
        aria-label="Global"
      >
        <div className="flex space-x-1 z-50">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
