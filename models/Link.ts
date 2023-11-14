export interface ILink {
  IsFrame: boolean;
  Link: string;
  ServerName: string;
}
export class LinkModel {
  private _IsFrame: boolean;
  private _Link: string;
  private _ServerName: string;
  constructor(link: ILink) {
    this._IsFrame = link.IsFrame;
    this._Link = link.Link;
    this._ServerName = link.ServerName;
  }
  get link(): string {
    return this._Link;
  }

  get serverName(): string {
    return this._ServerName;
  }
}
