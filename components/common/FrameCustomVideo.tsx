/* eslint-disable @next/next/no-img-element */
"use client";
import "rc-slider/assets/index.css";
import "@/components/styles/frame.scss";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import Slider from "rc-slider";
import { PlayIcon, PauseIcon, TransformIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const FrameCustomVideo: React.FC<any> = ({ src }) => {
  const vdRef = useRef<any | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isControls, setIsControls] = useState(false);
  const handle = useFullScreenHandle();

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
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) handle.exit();
    else handle.enter();
  };

  return (
    <FullScreen handle={handle} className="relative">
      <ReactHlsPlayer
        playerRef={vdRef}
        src={src || ""}
        autoPlay={false}
        controls={false}
        width="100%"
        height="auto"
        className={`mb-3 rounded-xl cursor-pointer overflow-hidden shadow-xl ${
          !isFullScreen && "max-h-[80vh] mb-3 lg:mb-5"
        }`}
        onClick={() => (!playing ? playVideo() : pauseVideo())}
        onMouseEnter={() => setIsControls(true)}
        onMouseLeave={() => setIsControls(false)}
      />
      <Image
        hidden={playing}
        src="/play-btn.png"
        alt="play"
        width={100}
        height={100}
        className="absolute top-[40%] left-[35%] lg:left-[47%] cursor-pointer"
        onClick={() => playVideo()}
      />
      <div
        className={`cursor-pointer flex gap-3 items-center bg-black/50 py-4 px-2 w-full absolute bottom-0 opacity-0 transition-all ease-linear ${[
          isControls && "opacity-100",
          !isFullScreen && "bottom-5",
        ].join(" ")}`}
        onMouseEnter={() => setIsControls(true)}
        onMouseLeave={() => setIsControls(false)}
      >
        <div className="text-2xl">
          {!playing ? (
            <PlayIcon className=" hover:scale-110 ease" onClick={playVideo} />
          ) : (
            <PauseIcon className="hover:scale-110 ease" onClick={pauseVideo} />
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
        <TransformIcon
          className="hover:scale-110 ease"
          onClick={toggleFullScreen}
        />
      </div>
    </FullScreen>
  );
};
export default FrameCustomVideo;
