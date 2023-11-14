import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");
  const episodeId = searchParams.get("episodeId");
  const server = searchParams.get("server");
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOTPHIM}/play/get`,
      {
        params: {
          movieId,
          episodeId,
          server: server || 0,
        },
      }
    );
    return new Response(JSON.stringify(data));
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}
