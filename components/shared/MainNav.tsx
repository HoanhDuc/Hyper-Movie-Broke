"use client";
import React, { useEffect, useState } from "react";
import ModeToggle from "@/components/shared/ModeToggle";
import { motion } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "@/components/switch-language/SwitcherLanguage";
import Link from "next/link";

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
      className={`fixed w-full top-0 z-[10000] transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-2xl border-b" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.25 }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
        aria-label="Global"
      >
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt=""
            width={150}
            height={50}
          />
        </Link>
        <div className="flex space-x-1 z-50">
          {/* <LanguageSwitcher /> */}
          {/* <ModeToggle /> */}
        </div>
      </nav>
    </motion.header>
  );
}
