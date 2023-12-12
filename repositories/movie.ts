import axios from "axios";

export const getMovies = async (params: any) => {
  return await axios.get(`api/search`, {
    params,
  });
};

export const detailMovie = async (name: string, params: any) => {
  return await axios.get(`api/movie/${name}`, {
    params,
  });
};

export const playMovie = async (params: any) => {
  return await axios.get(`api/play/get`, {
    params,
  });
};
