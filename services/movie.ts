import { MovieModel } from "@/models/Movie";
import { PaginationModel } from "@/models/Pagination";
import { IMovie } from "@/models/interfaces/MovieInterface";
import { detailMovie, getMovies, playMovie } from "@/repositories/movie";


export const getListMovies = async (params?: any) => {
  try {
    const dataFetch = await getMovies(params);
    const formatData = dataFetch.data?.Records?.map(
      (item: IMovie) => new MovieModel(item)
    );
    return {
      records: formatData,
      pagination: new PaginationModel(dataFetch.data?.Pagination),
    };
  } catch (err) {
    return { records: [], pagination: {} };
  }
};

export const getDetailMovie = async (name: string, params?: any) => {
  try {
    const {
      data: { movie, phimSapChieu, trendingMovies },
    } = await detailMovie(name, params);
    return { movie, phimSapChieu, trendingMovies };
  } catch (err) {
    return {};
  }
};


export const getPlayMovie = async (params: {
  movieId: number;
  episodeId?: number;
  server?: number;
}) => {
  try {
    const { data } = await playMovie(params);
    return data;
  } catch (err) {
    return {};
  }
};
