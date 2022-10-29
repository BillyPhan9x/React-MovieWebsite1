import React from "react";
import ReactDOM from "react-dom";

import styles from "../UI/Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const portalEl = document.getElementById("modal");
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalEl)};
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </React.Fragment>
  );
};

export default Modal;

// cần sử dụng React Protal để điều chỉnh vị trí của Modal ra hẳn bên ngoài Container App.

// Thêm 1 div có id modal là anh em(cùng cấp) với div có id root
