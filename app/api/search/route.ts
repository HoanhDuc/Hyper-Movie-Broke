import axios from "axios";

type ResponseData = {
  message: string;
};

const urlSearchParamsToObject = (urlSearchParams: any) => {
  const object: any = {};
  for (const [key, value] of urlSearchParams) {
    object[key] = value;
  }
  return object;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = urlSearchParamsToObject(searchParams);
  if (!params?.page) params.page = 1;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOVIE}/danh-sach`,
      { params }
    );

    return new Response(JSON.stringify(data));
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
