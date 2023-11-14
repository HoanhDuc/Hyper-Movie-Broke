import { IEpisodes } from "./interfaces/MovieInterface";

export class EpisodeModel {
  private _Id: number;
  private _EpisodeNumber: number;
  private _Status: boolean;
  private _ProductId: number;
  private _Name: string;
  private _Keyword: string;
  private _FullLink: string;
  private _Type: number;
  private _CreateOn: string;
  constructor(ep: IEpisodes) {
    this._Id = ep.Id;
    this._EpisodeNumber = ep.EpisodeNumber;
    this._Status = ep.Status;
    this._ProductId = ep.ProductId;
    this._Name = ep.Name;
    this._Keyword = ep.Keyword;
    this._FullLink = ep.FullLink;
    this._Type = ep.Type;
    this._CreateOn = ep.CreateOn;
  }
  get id(): number {
    return this._Id;
  }
  get name(): string {
    return this._Name;
  }
}
