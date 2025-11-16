import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesHttpResponse> {
  const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
}

export default fetchMovies;
