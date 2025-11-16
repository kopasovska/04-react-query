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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const onOpen = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  const onClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const onSearch = async (query: string) => {
    setQuery(query);
    setPage(1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={onSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && (
        <>
          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
          <MovieGrid movies={data?.results} onSelect={onOpen} />
        </>
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
