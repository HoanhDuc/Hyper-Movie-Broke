import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t z-40">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Created by{" "}
          <Link
            href="https://github.com/HoanhDuc"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 cursor-pointer"
          >
            Nguyễn Hoành Đức
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
