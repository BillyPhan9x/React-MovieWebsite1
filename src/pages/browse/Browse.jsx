import React from "react";

import requests from "../../api/requests";

import NavBar from "../../components/Header/NavBar";
import Banner from "../../components/Header/Banner";
import MovieList from "../../components/MovieList/MovieList";
import Footer from "../../components/Footer/Footer";

function Browse() {
  return (
    <>
      <NavBar />
      <Banner />
      <MovieList
        title=""
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <MovieList title="Xu hướng " fetchUrl={requests.fetchTrending} />
      <MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} />
      <MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} />
      <MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} />
      <MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
      <MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} />
      <MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} />
      <Footer />
    </>
  );
}
export default Browse;
