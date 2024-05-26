import { MovieModel } from "@/models/Movie";
import { PaginationModel } from "@/models/Pagination";
import { IMovie } from "@/models/interfaces/MovieInterface";
import { detailMovie, getMovies, playMovie } from "@/repositories/movie";

export const getListMovies = async (params?: any) => {
  try {
    const dataFetch = await getMovies(params);
    const formatData = dataFetch.data?.items?.map(
      (item: IMovie) => new MovieModel(item)
    );
    return {
      records: formatData,
      pagination: new PaginationModel(dataFetch.data?.pagination),
    };
  } catch (err) {
    return { records: [], pagination: {} };
  }
};

export const getDetailMovie = async (name: string, params?: any) => {
  try {
    const {
      data: { movie, episodes },
    } = await detailMovie(name, params);

    return { movie: { ...movie, episodes } };
  } catch (err) {
    return { error: true };
  }
};
