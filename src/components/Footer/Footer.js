import React from "react";

import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

import styles from "../Footer/Footer.module.css";

const footer = () => {
  return (
    <div className={styles.foo}>
      <div>
        <h1 className={styles.full}>@ 2022 Billy Phan</h1>
        <p> Demo test (3) movie app githup ASM2</p>
      </div>
      <div className={styles.icon}>
        <SiFacebook className={styles["icon-fa"]} />
        <FcGoogle className={styles["icon-gg"]} />
        <SiInstagram className={styles["icon-ins"]} />
        <SiTwitter className={styles["icon-twi"]} />
      </div>
    </div>
  );
};

export default footer;
