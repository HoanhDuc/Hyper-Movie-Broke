import { useRef, useState } from "react";
import { MovieModel } from "@/models/Movie";
import ReactHlsPlayer from "react-hls-player";

function Banner({ movieProps }: { movieProps: MovieModel }) {
  const [movie, setMovie] = useState<any | null>(null);
  const vdRef = useRef<any | null>(null);

  return (
    <div className="absolute top-0 w-full">
      <div className="max-h-[90vh] overflow-hidden">
        <ReactHlsPlayer
          playerRef={vdRef}
          src={`https://fetch.motchill-stream.win/op/fetch/https://hd1080.opstream2.com/20231016/43776_7004f317/index.m3u8`}
          autoPlay
          controls={false}
          width="100%"
          // height="auto"
        />
      </div>
      <div className="absolute top-[30%] left-10">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl mb-10">
          {movieProps?.name}
        </h1>
        <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which dont look even slightly believable.
        </p>
        <div className="flex space-x-3 mt-5">
          <button className="bannerButton bg-white text-black px-5 py-3 rounded-lg">
            Play
          </button>
          <button className="bannerButton bg-[gray]/70 px-5 py-3 rounded-lg">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
