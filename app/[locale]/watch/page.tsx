"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MovieModel } from "@/models/Movie";
import { Button } from "@/components/ui/button";
import { IEpisodes } from "@/models/interfaces/MovieInterface";
import { LinkModel } from "@/models/Link";
import { EpisodeModel } from "@/models/Episode";

const WatchMoviePage = () => {
  const router = useRouter()
  const pathname = usePathname();
  const vdRef = useRef<any | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const server = Number(searchParams.get("server")) || 0;
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(
    Number(searchParams.get("episodeId"))
  );
  const [movieInfo, setMovieInfo] = useState<MovieModel>();
  const [servers, setServers] = useState<LinkModel[]>();
  const [serverSelected, setServerSelected] = useState<LinkModel>();

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
          params: {
            movieId: id,
            episodeId: selectedEpisodeId || movieInfo?.episodes[0].id,
          },
        });
        setServerSelected(new LinkModel(data?.[0]));
        setServers(data.map((item: any) => new LinkModel(item)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (movieInfo) fetchData();
  }, [movieInfo, serverSelected, selectedEpisodeId]);

  const handleChangeEpisode = (id: number) => {
    setSelectedEpisodeId(id);
    router.push(`${pathname}?id=${id}&name=${name}&episodeId=${id}&server=${server}`);
  };

    const handleChangeServer = (item: LinkModel, index:number) => {
      setServerSelected(item);
      router.push(
        `${pathname}?id=${id}&name=${name}&episodeId=${id}&server=${index}`
      );
    };

  const Episodes = () => {
    return (
      <section hidden={!Boolean(movieInfo?.episodes.length)}>
        <p className="font-bold md:text-lg lg:text-xl mb-2">Episodes:</p>
        <div className="flex flex-wrap gap-3">
          {movieInfo?.episodes.map((item: EpisodeModel) => (
            <Button
              key={item.id}
              variant={item.id === selectedEpisodeId ? "secondary" : "default"}
              onClick={() => handleChangeEpisode(item.id)}
            >
              {item.name}
            </Button>
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
          {servers?.map((item: LinkModel, index: number) => (
            <Button
              key={item.link}
              variant={index === server ? "secondary" : "default"}
              onClick={() => handleChangeServer(item, index)}
            >
              {item.serverName}
            </Button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="container mx-auto flex flex-col gap-3 py-14">
      <ReactHlsPlayer
        playerRef={vdRef}
        src={serverSelected?.link || ""}
        autoPlay
        controls={true}
        width="100%"
        className="max-h-[80vh] cursor-pointer rounded-md overflow-hidden mx-auto border border-white"
      />
        <Servers />
        <Episodes />
    </div>
  );
};
export default WatchMoviePage;