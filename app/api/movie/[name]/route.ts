import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOVIE}/phim/${params.name}`
    );
    return new Response(JSON.stringify(data));
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}
