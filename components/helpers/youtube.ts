export const extractVideoId = (youtubeUrl: string | undefined) => {
  if (!youtubeUrl) return "null";
  const pattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = youtubeUrl.match(pattern);
  if (match) return match[1] as string;
};
