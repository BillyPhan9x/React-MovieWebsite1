import React, { useState, useEffect, useCallback } from "react";

import axios from "../../api/axios";
import { ToastContainer } from "react-toastify";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import MovieDetail from "../MovieDetail/MovieDetail";

import { useDragSlider } from "../../hooks/use-dragSlider";
import { useHttpInfoMovie } from "../../hooks/use-httpInfoMovie";

import styles from "./MovieList.module.css";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

const MovieList = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  // use-dragSlider.js
  // gọi useDragSlider hook custom và lưu giá trị vào biến hằng số
  const dragSlider = useDragSlider();
  // Lấy ra các giá trị trả về từ Hook useHttp()
  const {
    sliderRef,
    movieRef,
    handleScrollLeft,
    handleScrollRight,
    onDragStart,
    onDragEnd,
    onDragEnter,
  } = dragSlider;

  // use-httpInfoMovie.js
  const httpInfoMovie = useHttpInfoMovie();

  const { detailMovie, trailer, videoTrailer, handleClickMovie } =
    httpInfoMovie;

  const fetchMovies = useCallback(async () => {
    try {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
    } catch (err) {
      console.log(err);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const classesPosters = `${styles["row__posters"]} ${
    !isLargeRow && styles["row__posters--scroll"]
  }
  }`;

  const classesImg = `${styles["row__item--image"]} ${
    isLargeRow ? styles["row__poster"] : styles["row__backdrop"]
  } }`;

  return (
    <div className={styles.row} drapgable="false">
      <ToastContainer />
      <h1 className={styles["row__heading"]}>{title}</h1>
      <div
        className={classesPosters}
        ref={sliderRef}
        drapgable="true"
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
      >
        {movies &&
          movies.length > 0 &&
          movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div
                  className={styles["row__item"]}
                  key={movie.id}
                  ref={movieRef}
                  drapgable="false"
                >
                  <img
                    className={classesImg}
                    src={`${IMAGE_PATH}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name || movie.title}
                    onClick={() => {
                      handleClickMovie(movie.id);
                    }}
                    drapgable="false"
                  />
                </div>
              )
          )}
      </div>
      <div
        className={`${styles.btn} ${styles["btn--left"]}`}
        onClick={handleScrollLeft}
      >
        <FiChevronLeft />
      </div>
      <div
        className={`${styles.btn} ${styles["btn--right"]}`}
        onClick={handleScrollRight}
      >
        <FiChevronRight />
      </div>

      {detailMovie.isOpen && detailMovie.activeId === videoTrailer.id && (
        <MovieDetail
          movieData={videoTrailer}
          trailer={trailer}
          showBtn="true"
        />
      )}
    </div>
  );
};

export default MovieList;
