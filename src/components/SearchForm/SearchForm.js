import React, { useRef } from "react";

import IconSearch from "../../icon/IconSearch";

import styles from "./SearchForm.module.css";

const SearchForm = (props) => {
  const searchInputRef = useRef();

  const searchMovies = (e) => {
    e.preventDefault();

    const enterdValue = searchInputRef.current.value;
    if (enterdValue.length > 0) {
      props.fetchData(enterdValue);
    }

    // Truyền data sử dụng props.callback(dataToParent)
    props.parentCallback(enterdValue);
  };

  // reset lại danh sách phim mặc định và xoá giá trị của trường đầu vào
  const handleClickBtnReset = () => {
    props.fetchDataDefault();
    searchInputRef.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={searchMovies}>
      <div className={styles.formForm}>
        <input className={styles.inputForm} type="text" ref={searchInputRef} />
        <IconSearch />
      </div>
      <hr className={styles.dashLine} />

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.btnReset}
          onClick={handleClickBtnReset}
        >
          RESET
        </button>
        <button type="submit" className={styles.btnSearch}>
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

// const fetchData = async (searchKey) => {
//   const request = await axios.get(
//     `${requests.fetchSearch}&query=${searchKey}`
//   );
//   console.log("~ request", request);
// };
