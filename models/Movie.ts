import { IMovie } from "./interfaces/MovieInterface";

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
  }

  get name(): string {
    return this._Name;
  }
  get thumbnail(): string {
    return this._AvatarImageThumb;
  }
  get link(): string {
    return this._Link;
  }
}
