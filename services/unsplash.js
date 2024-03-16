import axios from "axios";
import { config } from "dotenv";

config();

export async function searchImages(query) {
  const response = await axios.get(process.env.UNSPLASH_URL, {
    params: { query },
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
  });

  return response.data.results;
}
