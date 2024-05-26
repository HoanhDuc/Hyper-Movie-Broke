import { IEpisodes, ServerDaum } from "./interfaces/MovieInterface";

export class EpisodeModel {
  private _serverName: string;
  private _serverData: ServerDaum[];

  constructor(ep: IEpisodes) {
    this._serverName = ep.server_name;
    this._serverData = ep.server_data.map((data: ServerDaum) => ({
      name: data.name,
      slug: data.slug,
      filename: data.filename,
      link_embed: data.link_embed,
      link_m3u8: data.link_m3u8,
    }));
  }
  get serverName() {
    return this._serverName;
  }

  get serverData() {
    return this._serverData;
  }
}
