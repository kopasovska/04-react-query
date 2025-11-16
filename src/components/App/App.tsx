import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css";
import { useState } from "react";
import fetchMovies from "../../services/movieService.ts";
import type { Movie } from "../../types/movie.ts";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onOpen = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  const onClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const onSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const movies = await fetchMovies(query);
      if (movies.length === 0) {
        toast.error("No movies found for your request.", {
          position: "bottom-right",
        });
      }
      setMovies(movies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={onSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={onOpen} />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
