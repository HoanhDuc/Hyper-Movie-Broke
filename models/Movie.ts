import { EpisodeModel } from "@/models/Episode";
import { ICast, IEpisodes, IMovie } from "@/models/interfaces/MovieInterface";
import { CastModel } from "@/models/Cast";

export class MovieModel {
  private _Id: number;
  private _Name: string;
  private _OtherName: string;
  private _Avatar: string;
  private _Banner: string;
  private _Link: string;
  private _Quanlity: string;
  private _ViewNumber: string;
  private _TypeRaw: string;
  private _Year: number;
  private _StatusRaw: string;
  private _StatusTitle: string;
  private _UpdateOn: string;
  private _AvatarImageThumb: string;
  private _AvatarImage: string;
  private _Description: string;
  private _Episodes: IEpisodes[];
  private _EpisodeTrailer: IEpisodes[];
  private _Trailer?: string;
  private _Casts?: ICast[];
  constructor(movie: IMovie) {
    this._Id = movie.Id;
    this._Name = movie.Name;
    this._OtherName = movie.OtherName;
    this._Avatar = movie.Avatar;
    this._Banner = movie.Banner;
    this._Link = movie.Link;
    this._Quanlity = movie.Quanlity;
    this._ViewNumber = movie.ViewNumber;
    this._TypeRaw = movie.TypeRaw;
    this._Year = movie.Year;
    this._StatusRaw = movie.StatusRaw;
    this._StatusTitle = movie.StatusTitle;
    this._UpdateOn = movie.UpdateOn;
    this._AvatarImageThumb = movie.AvatarImageThumb;
    this._AvatarImage = movie.AvatarImage;
    this._Description = movie.Description;
    this._Episodes = movie.Episodes;
    this._EpisodeTrailer = movie.EpisodeTrailer;
    this._Trailer = movie?.Trailer;
    this._Casts = movie?.Casts;
  }
  get id(): number {
    return this._Id;
  }

  get thumbnail(): string {
    return this._Avatar;
  }

  get name(): string {
    return this._Name;
  }

  get poster(): string {
    return this._AvatarImageThumb;
  }

  get link(): string {
    return this._Link;
  }

  get description(): string {
    return this._Description;
  }

  get episodes(): EpisodeModel[] {
    return this._Episodes.map((item) => new EpisodeModel(item));
  }

  get statusTitle(): string {
    return this._StatusTitle;
  }

  get viewNumber(): string {
    return this._ViewNumber;
  }

  get year(): number {
    return this._Year;
  }

  get statusRaw(): string {
    return this._StatusRaw;
  }

  get isTrailer(): boolean {
    return this._StatusRaw === "trailer";
  }

  get trailerYT(): string | undefined {
    return this._Trailer;
  }

  get casts(): CastModel[] | undefined {
    return this._Casts?.map((item: ICast) => new CastModel(item));
  }
}
