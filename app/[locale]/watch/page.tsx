"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useSearchParams } from "next/navigation";
import { MovieModel } from "@/models/Movie";
import { Button } from "@/components/ui/button";
import { IEpisodes } from "@/models/interfaces/MovieInterface";
import { ILink, LinkModel } from "@/models/Link";

const WatchMoviePage = () => {
  const vdRef = useRef<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const episode = searchParams.get("episode");
  const [movieInfo, setMovieInfo] = useState<MovieModel>();
  const [servers, setServers] = useState<LinkModel[]>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { movie },
        }: any = await axios.get(`/api/movie/${name}`);
        setMovieInfo(new MovieModel(movie));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id && name) fetchData();
  }, [id, name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: any = await axios.get("/api/play/get", {
          params: { movieId: id, episode: episode || movieInfo?.episodes[0] },
        });
        setServers(data.map((item:any) => new LinkModel(item)))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (movieInfo) fetchData();
  }, [movieInfo]);

  const Episodes = () => {
    return (
      <section hidden={!Boolean(movieInfo?.episodes.length)}>
        <p className="font-bold md:text-lg lg:text-xl mb-2">Episodes:</p>
        <div className="flex flex-wrap gap-3">
          {movieInfo?.episodes.map((item: IEpisodes) => (
            <Button key={item.Id}>{item.Name}</Button>
          ))}
        </div>
      </section>
    );
  };

    const Servers = () => {
      return (
        <section hidden={!Boolean(servers?.length)}>
          <p className="font-bold md:text-lg lg:text-xl mb-2">Server:</p>
          <div className="flex flex-wrap gap-3">
            {servers?.map((item: LinkModel) => (
              <Button key={item.link}>{item.serverName}</Button>
            ))}
          </div>
        </section>
      );
    };

  return (
    <div className="py-14">
      <ReactHlsPlayer
        playerRef={vdRef}
        src={`https://vie2.opstream7.com/20231113/1575_4ce4831f/index.m3u8`}
        autoPlay
        controls={true}
        width="100%"
        className="max-h-[80vh] cursor-pointer rounded-md overflow-hidden mx-auto"
      />
      <div className="container mx-auto flex flex-col gap-3 mt-5">
        <Servers />
        <Episodes />
      </div>
    </div>
  );
};

export default WatchMoviePage;
