import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import requests from "../../api/requests";

import NavBar from "../../components/Header/NavBar";
import SearchForm from "../../components/SearchForm/SearchForm";
import SearchList from "../../components/SearchList/SearchList";
import Footer from "../../components/Footer/Footer";

import styles from "./Search.module.css";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchMoviesDefault();
  }, []);

  const fetchMoviesDefault = async () => {
    const request = await axios.get(requests.fetchNetflixOriginals);

    setMovies(request.data.results);
  };

  const fetchMoviesHandler = async (enterValue) => {
    const request = await axios.get(
      `${requests.fetchSearch}&query=${enterValue}`
    );

    setMovies(request.data.results);
  };

  // Từ con sang cha sử dụng callbacks, hàm callback để nhận tham số lấy từ searchForm.
  const handleValueKeyword = (searchFormValue) => {
    setKeyword(searchFormValue);
  };

  let content = (
    <p className={styles["paragraph__place"]}>
      Your search for <span className={styles.keyword}>'{keyword}'</span> did
      not have any matches.
    </p>
  );

  if (movies.length > 0) {
    content = <SearchList movies={movies} />;
  }

  return (
    <>
      <NavBar />
      <SearchForm
        fetchData={fetchMoviesHandler}
        fetchDataDefault={fetchMoviesDefault}
        parentCallback={handleValueKeyword}
      />
      <h2 className={styles["search__title"]}>Search Results</h2>
      {content}
      <Footer />
    </>
  );
};

export default Search;
