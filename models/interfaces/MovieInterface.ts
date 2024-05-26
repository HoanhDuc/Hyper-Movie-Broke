import { CastModel } from "@/models/Cast";
export interface IMovie {
  modified: {
    time: string;
  };
  _id: number;
  name: string;
  slug: string;
  origin_name: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  imdb_rating: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  time_loading: number;
  created: string;
  content: string;
  type: string;
  status: string;
  is_copyright: string;
  sub_docquyen: string;
  chieurap: string;
  trailer_url: string;
  time: string;
  notify: any;
  showtimes: string;
  view: number;
  actor: string;
  director: string;
  category: string;
  country: string;
  episodes: {
    server_name: string;
    server_data: ServerDaum[];
  }[];
  // tmdb: Tmdb;
  // imdb: Imdb;
  // export interface Tmdb {
  //   type: string
  //   id: string
  //   season: string
  //   vote_average: string
  //   vote_count: number
  // }

  // export interface Imdb {
  //   id: string
  //   rating: string
  // }
}

export interface ServerDaum {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface ICountry {
  Id: number;
  Name: string;
  Link: string;
  DisplayColumn: number;
}

export interface ICategory {
  Id: number;
  Name: string;
  Link: string;
  DisplayColumn: number;
}

export interface ICast {
  Id: number;
  Name: string;
  Link: string;
  Avatar?: string;
}

export interface INewTag {
  Name: string;
  Link: string;
}
export interface IDirectorDto {
  Name: string;
  Link: string;
}
export interface ICastDto {
  Id: number;
  Name: string;
  Link: string;
}

export interface IEpisodes {
  server_name: string;
  server_data: ServerDaum[];
}
export interface ServerDaum {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface IPagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: string;
  totalPages: number;
}
