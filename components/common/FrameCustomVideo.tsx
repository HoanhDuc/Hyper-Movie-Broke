import { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useTheme } from "next-themes";
import axios from "axios";

export default function Player({ option, src, getInstance, ...rest }: any) {
  const artRef = useRef();
  const { setTheme } = useTheme();
  useEffect(() => {
    if (src){
        const art = new Artplayer({
      ...option,
      url: src,
      volume: 0.5,
      isLive: false,
      muted: false,
      autoplay: true,
      pip: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      // subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#DC2626",
      container: artRef.current,
      thumbnails: {
        url: "https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg",
        number: 60,
        column: 10,
        width: 160,
        height: 90
      },
      icons: {
        loading: `<div class="loader"></div>`,
        state: '<img width="150" heigth="150" class="" src="/play-btn.png">',
      },
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      quality: [
        {
          default: true,
          html: "SD 480P",
          url: src,
        },
        {
          html: "HD 720P",
          url: src,
        },
      ],
      settings: [
        {
          html: "Light",
          tooltip: "OFF",
          switch: false,
          onSwitch: function (item) {
            item.tooltip = item.switch ? "OFF" : "ON";
            setTheme(item.switch ? "dark" : "light");
            return !item.switch;
          },
        },
      ],
      customType: {
        m3u8: function playM3u8(video, url, art: any) {
          if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on("destroy", () => hls.destroy());
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            art.notice.show = "Unsupported playback format: m3u8";
          }
        },
      },
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
    }
  
  }, [src]);

  return (
    <div
      ref={artRef}
      {...rest}
      className="w-full h-[250px] lg:h-[70vh] mb-3 rounded-xl cursor-pointer overflow-hidden shadow-xl"
    >
    </div>

  );
}
