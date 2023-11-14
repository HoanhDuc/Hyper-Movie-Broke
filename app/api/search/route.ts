import { MovieModel } from "@/models/Movie";
import { IMovie } from "@/models/interfaces/MovieInterface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export async function GET(res: NextApiResponse<ResponseData>) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOTPHIM}/search`
    );
    return new Response(JSON.stringify(data));
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
