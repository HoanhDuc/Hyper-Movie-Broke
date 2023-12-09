export const errorImage = (e: any) => {
  e.target.onerror = null;
  e.target.src = "/ducnh.png";
};
export const defaultImg = "/user-not-found.png";