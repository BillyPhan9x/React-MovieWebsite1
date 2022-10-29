import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHttpInfoMovie } from "../../hooks/use-httpInfoMovie";

import MovieDetail from "../MovieDetail/MovieDetail";
import Modal from "../UI/Modal";

import styles from "./SearchList.module.css";

const SearchList = ({ movies }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  // use-httpInfoMovie.js
  // gọi useHttpInfoMovie hook custom và lưu giá trị vào biến hằng số
  const httpInfoMovie = useHttpInfoMovie();
  // Lấy ra các giá trị trả về từ Hook useHttp()
  const {
    detailMovie,
    trailer,
    videoTrailer,
    handleClickMovie,
    hideMovieDetailHandler,
  } = httpInfoMovie;

  return (
    <div className={styles.list}>
      {detailMovie.isOpen && detailMovie.activeId === videoTrailer.id && (
        <Modal onClick={() => hideMovieDetailHandler()}>
          <MovieDetail
            trailer={trailer}
            movieData={videoTrailer}
            onHideMoiveDetail={() => hideMovieDetailHandler()}
          />
        </Modal>
      )}
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path ? (
              <img
                className={styles["list__movie"]}
                src={`${IMAGE_PATH}${movie.poster_path}`}
                alt={movie?.title || movie?.name}
                onClick={() => handleClickMovie(movie.id)}
              />
            ) : (
              <div className={styles.placeholder}>No Image Found</div>
            )}
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};

export default SearchList;
