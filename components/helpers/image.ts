export const errorImage = (e: any) => {
  e.target.onerror = null;
  e.target.src = "/ducnh.png";
};
export const defaultImg = "/ducnh.png";