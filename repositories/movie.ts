import axios from "@/axios";

const nameGetTopView = "/movie/topview";

export const getTopViews = async () => {
  return await axios.get(nameGetTopView);
};
