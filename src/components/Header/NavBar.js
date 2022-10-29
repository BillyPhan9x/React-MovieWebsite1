import React, { useEffect, useState } from "react";
import IconSearch from "../../icon/IconSearch";

import styles from "./NavBar.module.css";

//  Tạo Component Navbar và có nhiệm vụ để render giao diện
const NavBar = () => {
  const [scrollY, setScrollY] = useState(false);

  // Bắt sự kiện scroll của Window, nếu như window.scrollY lớn hơn 100px thì sẽ render ra class tương ứng (thay đổi state cho Component).
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  // Bổ sung thêm phần hiệu ứng cho Navbar, nếu như người dùng cuộn xuống quá 100px thì sẽ đổi màu nền cho Navbar từ trong suốt sang màu đen.
  // Lắng nghe sự kiện của window vs sự kiện scroll và hàm transitionNavBar
  // useEffect cho phép chúng ta return 1 function, function này sẽ thực thi trước khi mà component đó được Unmount.( sẽ chạy mỗi khi 1 component chuẩn bị remove khỏi tree DOM)
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  // Khi click vào phần chữ "Movie App", người dùng sẽ được chuyển về trang chủ ("/").
  const clickMovieAppHandler = () => {
    window.location.replace("/");
  };

  // Khi click vào phần nút Search thì người dùng sẽ được chuyển về trang tìm kiếm ("search").
  const clickIconSearchHandler = () => {
    window.location.replace("/search");
  };

  //Trả về 1 JSX với 1 div chứa tên(logo), icon search
  // Lắng nghe và xử lý sự kiện click trên elment thông qua props onClick
  return (
    <div className={`${styles.nav} ${scrollY && styles["nav__black"]} `}>
      <h1 className={styles["nav__logo"]} onClick={clickMovieAppHandler}>
        Movie App
      </h1>
      <IconSearch onClick={clickIconSearchHandler} />
    </div>
  );
};

export default NavBar;

// Effect Hook cho phép thực hiện side effect bên trong các function component
// mục đích useEffect để quản lý vòng đời của của 1 component và nó phục vụ chúng ta use trong function component thay vì các lifecycle như trước đây trong class component.

// use React HookEffect có 1 phụ thuộc 0 cần thiết: 'window'. Loại trừ nó hoặc loại bỏ mảng phụ thuộc. Các giá trị phạm vi bên ngoài như 'cửa sổ' 0 phải là phụ thuộc hợp lệ vì việc thay đổi chúng 0 hiển thị lại thành phần

// Nếu chúng ta muốn hàm useEffect() chỉ gọi 1 lần khi render components (tương đương với componentDidMount). Trong trường hợp này ta chỉ cần truyền tham số thứ 2 của useEffect() là 1 hàm rỗng []
