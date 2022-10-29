import React from "react";

import YouTube from "react-youtube";

import styles from "./MovieDetail.module.css";

const MovieDetail = ({ movieData, onHideMoiveDetail, trailer, showBtn }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const opts = {
    height: "400",
    width: "100%",
    playVars: {
      autoplay: 0,
    },
  };

  const infoDetailMovie = (
    <div className={styles["movie__detail"]}>
      <button
        className={`${styles["movie--close"]} ${showBtn && styles.hide}`}
        onClick={onHideMoiveDetail}
      >
        X
      </button>
      <h1 className={styles["movie__detail--title"]}>
        {movieData.title || movieData.name || movieData.original_title}
      </h1>
      <hr className={styles["movie__dashline"]} />
      <div className={styles["movie__detail--info"]}>
        <span className={styles["info__date"]}>
          Release Date: {movieData.release_date}
        </span>
        <span className={styles["info__vote"]}>
          Vote: {movieData.vote_average} /10
        </span>
      </div>
      <h5 className={styles["info__description"]}>{movieData.overview}</h5>
    </div>
  );

  return (
    <>
      {trailer ? (
        <div className={styles.backdrop}>
          {infoDetailMovie}
          <div className={styles["movie__youtube"]}>
            <YouTube videoId={movieData.key} opts={opts} />
          </div>
        </div>
      ) : (
        <div
          className={styles.modal}
          style={{
            backgroundImage: `url(${IMAGE_PATH}${
              movieData?.backdrop_path || movieData?.poster_path
            })`,
            backgroundSize: "50% 100%",
          }}
        >
          <div className={styles.content}> {infoDetailMovie}</div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
