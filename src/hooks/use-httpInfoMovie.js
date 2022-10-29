import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";

export const useHttpInfoMovie = () => {
  const MOVIE_API = "https://api.themoviedb.org/3";
  const API_KEY = "e49c9be6256b1eaf54581c1afd2ce4dd";

  const [detailMovie, setDetailMovie] = useState({
    activeId: null,
    isOpen: false,
  });

  const [videoTrailer, setVideoTrailer] = useState({});
  const [trailer, setTrailer] = useState(false);

  const hideMovieDetailHandler = () => {
    setDetailMovie((prev) => !prev);
  };

  const handleClickMovie = async (id) => {
    if (detailMovie.isOpen && detailMovie.activeId === id)
      return setDetailMovie({ activeId: null, isOpen: false });
    try {
      const result = await Promise.all([
        axios.get(`${MOVIE_API}/movie/${id}?api_key=${API_KEY}`),
        axios.get(`${MOVIE_API}/movie/${id}/videos?api_key=${API_KEY}`),
      ]);

      if (!result) {
        throw new Error("Movie ID is not found...");
      }

      if (result[1].data.results.length > 0) {
        const eligibleVideo = result[1].data.results.filter(
          (v) =>
            (v.site === "YouTube" && v.type === "Trailer") ||
            v.type === "Teaser"
        );
        const { key } = eligibleVideo[0];
        result[0].data.key = key;
        setTrailer(true);
        setVideoTrailer(result[0].data);
      } else {
        setTrailer(false);
        setVideoTrailer(result[0].data);
      }

      setDetailMovie({ ...detailMovie, activeId: id, isOpen: true });
    } catch (error) {
      return toast(
        "This movie has not Youtube trailer. Please select others!",
        {
          type: "error",
          position: "top-right",
          autoClose: 1000,
        }
      );
    }
  };
  return {
    detailMovie,
    videoTrailer,
    trailer,
    handleClickMovie,
    hideMovieDetailHandler,
    toast,
  };
};
