import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<Movie[]> {
  const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  return response.data.results;
}

export default fetchMovies;
