import { EpisodeModel } from "@/models/Episode";
import { ICast, IEpisodes, IMovie } from "@/models/interfaces/MovieInterface";
import { CastModel } from "@/models/Cast";
export class MovieModel {
  private _id: number;
  private _name: string;
  private _otherName: string;
  private _avatar: string;
  private _banner: string;
  private _link: string;
  private _quality: string;
  private _avatarImageThumb: string;
  private _lang: string;
  private _viewNumber: number;
  private _typeRaw: string;
  private _year: number;
  private _statusRaw: string;
  private _statusTitle: string;
  private _updateOn: number;
  private _avatarImage: string;
  private _description: string;
  private _episodes: IEpisodes[];
  private _episodeCurrent: string;
  private _imdbRating: string;
  private _trailer?: string;
  private _casts?: ICast[];
  // private _seoTitle: string;
  // private _seoDescription: string;
  // private _keyword: string;
  constructor(movie: IMovie) {
    this._id = movie._id;
    this._name = movie.name;
    this._otherName = movie.origin_name;
    this._avatar = movie.thumb_url;
    this._banner = movie.poster_url;
    this._link = movie.slug;
    this._quality = movie.quality;
    this._avatarImageThumb = movie.thumb_url;
    this._lang = movie.lang;
    this._viewNumber = movie.view;
    this._typeRaw = movie.type;
    this._year = movie.year;
    this._statusRaw = movie.status;
    this._statusTitle = movie.status;
    this._updateOn = movie.time_loading;
    this._avatarImage = movie.thumb_url;
    this._description = movie.content;
    this._episodes = movie.episodes;
    this._episodeCurrent = movie.episode_current;
    this._imdbRating = movie.imdb_rating;
    // this._episodeTrailer = movie.EpisodeTrailer;
    // this._trailer = movie?.Trailer;
    // this._casts = movie?.Casts;
    // this._seoTitle = movie?.SeoTitle;
    // this._seoDescription = movie?.SeoDescription;
    // this._keyword = movie?.Keyword;
  }
  get id(): number {
    return this._id;
  }

  get thumbnail(): string {
    return this._avatar;
  }

  get name(): string {
    return this._name;
  }

  get poster(): string {
    return `https://apii.online/image/${this._avatarImageThumb}`;
  }

  get link(): string {
    return this._link;
  }

  get quality(): string {
    return this._quality;
  }

  get description(): string {
    return this._description;
  }

  get episodes(): EpisodeModel[] {
    return this._episodes?.map((item) => new EpisodeModel(item));
  }

  get statusTitle(): string {
    return this._lang;
  }

  get viewNumber(): number {
    return this._viewNumber;
  }

  get year(): number {
    return this._year;
  }

  get statusRaw(): string {
    return this._statusRaw;
  }

  get isTrailer(): boolean {
    return this._statusRaw === "trailer";
  }

  get trailerYT(): string | undefined {
    return this._trailer;
  }

  get casts(): CastModel[] | undefined {
    return this._casts?.map((item: ICast) => new CastModel(item));
  }
  get episodeCurrent(): string {
    return this._episodeCurrent;
  }
  get imdbRating(): string {
    return this._imdbRating;
  }
  // get seoTitle(): string {
  //   return this._seoTitle;
  // }

  // get seoDescription(): string {
  //   return this._seoDescription;
  // }

  // get keyword(): string {
  //   return this._keyword;
  // }
}
