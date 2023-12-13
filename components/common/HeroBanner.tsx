"use client";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative w-full">
      <Image
        src="/banner.png"
        alt=""
        width={1920}
        height={1080}
        className="w-screen h-[80vh] max-h-screen object-cover"
      />
    </div>
  );
}

export default Banner;
//https://asicsulb.org/corporate/images/connect/beachfront/2019-01/movies-on-the-house.jpg
//https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e123eed-7564-4950-a68c-b4e748016358/dcgftcl-8c2f188b-f981-4cf8-907a-da3ae34ecef9.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhlMTIzZWVkLTc1NjQtNDk1MC1hNjhjLWI0ZTc0ODAxNjM1OFwvZGNnZnRjbC04YzJmMTg4Yi1mOTgxLTRjZjgtOTA3YS1kYTNhZTM0ZWNlZjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.o1KF6QdtcAhHANklCbwNu5Kd-vtQq7Tqbhav-Ji_JZE