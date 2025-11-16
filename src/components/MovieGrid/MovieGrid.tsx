import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id} onClick={() => onSelect(m)}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
