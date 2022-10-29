import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import requests from "../../api/requests";

import styles from "./Banner.module.css";

// Tạo Component Banner để hiển thị phần Banner cũng như thông tin của bộ phim với giao diện
const Banner = () => {
  // URL hình ảnh API cơ sở dữ liệu phim (base_url và file_size)
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    // lấy dữ liệu từ API fetchNetflixOriginals, API này sẽ trả về thông tin của 20 bộ phim
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //   console.log("~ request", request);

      // lấy ngẫu nhiên thông tin một bộ phim trong danh sách đó để hiển thị lên Banner.
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    };

    fetchData();
  }, []);
  //   console.log(movie);

  // Hàm cắt ngắn các chuỗi dài (kiểm tra độ dài chuỗi, thiết lập độ dài chuỗi nhất định, nếu độ dài chuỗi dài hơn độ dài đã thiết lặp thì cắt và thay vào đó ...)
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  // Phần ảnh banner, bạn sẽ cần sử dụng ảnh backdrop (tương ứng với trường backdrop_path trả về từ API)
  return (
    <header
      className={styles.banner}
      style={{
        backgroundImage: `url(${IMAGE_PATH}${
          movie?.backdrop_path || movie?.poster_path
        })`,
      }}
    >
      <div className={styles["banner__contents"]}>
        <h1 className={styles["banner__title"]}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles["banner__buttons"]}>
          <button type="button" className={styles["banner__button"]}>
            Play
          </button>
          <button type="button" className={styles["banner__button"]}>
            My List
          </button>
        </div>
        <h1 className={styles["banner__description"]}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
};

export default Banner;
