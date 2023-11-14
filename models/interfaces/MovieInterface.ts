export interface IMovie {
  Banner: string;
  Quanlity: string;
  Id: number;
  Name: string;
  OtherName: string;
  Avatar: string;
  Description: string;
  ViewNumber: number;
  EpisodesTotal: number;
  Status: number;
  TypeId: number;
  Year: number;
  Director: string;
  Time: string;
  Trailer: string;
  Link: string;
  ShowTimes: string;
  SearchText: string;
  SeoTitle: string;
  SeoDescription: string;
  Keyword: string;
  StatusTitle: string;
  SeoKeywords: string;
  OriginalLink: string;
  CastString: string;
  TypeRaw: string;
  StatusRaw: string;
  Countries: ICountry[];
  Categories: ICategory[];
  Casts: ICast[];
  Episodes: IEpisodes[];
  EpisodeTrailer: IEpisodes[];
  PlayUrl: string;
  AvatarImage: string;
  AvatarImageThumb: string;
  Tags: string[];
  NewTags: INewTag[];
  DirectorDto: IDirectorDto[];
  CastDto: ICastDto[];
  CreatedOn: string;
  UpdateOn: string;
  LokLokMovie: boolean;
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
  Id: number;
  EpisodeNumber: number;
  Status: boolean;
  ProductId: number;
  Name: string;
  Keyword: string;
  FullLink: string;
  Type: number;
  CreateOn: string;
}
