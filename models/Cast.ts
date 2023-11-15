import { ICast } from './interfaces/MovieInterface';
export class CastModel {
  private _Id: number;
  private _Name: string;
  private _Avatar?: string;
  constructor(cast: ICast) {
    this._Id = cast.Id;
    this._Name = cast.Name;
    this._Avatar = cast?.Avatar;
  }

  get name(): string {
    return this._Name;
  }

  get avatar(): string | undefined {
    return this._Avatar;
  }
}
