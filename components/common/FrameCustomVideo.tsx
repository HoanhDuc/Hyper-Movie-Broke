/* eslint-disable @next/next/no-img-element */
"use client";
import "rc-slider/assets/index.css";
import "@/components/styles/frame.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import Slider from "rc-slider";
import { PlayIcon, PauseIcon, TransformIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const FrameCustomVideo: React.FC<any> = ({ src }) => {
  const vdRef = useRef<any | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (vdRef.current) setCurrentTime(vdRef.current.currentTime);
    };
    if (vdRef.current) {
      vdRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (vdRef.current) {
        vdRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const duration = useMemo(() => {
    if (vdRef.current?.duration) return vdRef.current.duration;
    return 0;
  }, [vdRef.current?.duration]);

  const displayTime = useMemo(() => {
    const formatDigit = (value: any) => (value < 10 ? `0${value}` : value);
    const formatSeconds = (seconds: any) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${formatDigit(minutes)}:${formatDigit(remainingSeconds)}`;
    };
    const formattedCurrentTime = formatSeconds(currentTime);
    const formattedDuration = formatSeconds(duration);
    return `${formattedCurrentTime} / ${formattedDuration}`;
  }, [currentTime, duration]);

  const handleSliderChange = (value: any) => {
    setCurrentTime(value);
    if (vdRef.current) vdRef.current.currentTime = value;
  };

  const playVideo = () => {
    setPlaying(true);
    if (vdRef.current) vdRef.current.play();
  };

  const pauseVideo = () => {
    setPlaying(false);
    if (vdRef.current) vdRef.current.pause();
  };

    const toggleFullScreen = () => {
    //   if (vdRef.current) {
    //     if (document.fullscreenElement) {
    //       document.exitFullscreen();
    //     } else {
    //       vdRef.current.requestFullscreen().catch((err:any) => {
    //         console.error("Error attempting to enable full-screen mode:", err);
    //       });
    //     }
    //   }
    setIsFullScreen(!isFullScreen)
    };

  return (
    <div className="relative">
      <ReactHlsPlayer
        playerRef={vdRef}
        src={src || ""}
        autoPlay
        controls={false}
        width="100%"
        height="auto"
        className={`mb-3 lg:mb-5 max-h-[80vh] rounded-xl cursor-pointer overflow-hidden shadow-xl ${
          isFullScreen && "h-screen w-screen z-50"
        }`}
        onClick={() => (!playing ? playVideo() : pauseVideo())}
      />
      <Image
        hidden={playing}
        src="/play-btn.png"
        alt="play"
        width={100}
        height={100}
        className="absolute top-[46%] left-[46%]"
        onClick={() => playVideo()}
      />
      <div className="flex gap-3 items-center backdrop-blur-md py-4 px-2 rounded-md w-full">
        <div className="text-2xl cursor-pointer">
          {!playing ? (
            <PlayIcon fontSize={"20px"} onClick={playVideo} />
          ) : (
            <PauseIcon onClick={pauseVideo} />
          )}
        </div>
        <p className="text-sm whitespace-nowrap">{displayTime}</p>
        <Slider
          value={currentTime}
          min={0}
          max={duration}
          step={1}
          keyboard
          onChange={handleSliderChange}
          trackStyle={{ backgroundColor: "#ff0000", height: 5 }}
          railStyle={{ backgroundColor: "#fff", height: 5 }}
          handleStyle={{
            borderColor: "#fff",
            backgroundColor: "#ff0000",
            boxShadow: "0 0 0 2px white",
          }}
        />
        <TransformIcon onClick={toggleFullScreen} />
      </div>
    </div>
  );
};
export default FrameCustomVideo;
