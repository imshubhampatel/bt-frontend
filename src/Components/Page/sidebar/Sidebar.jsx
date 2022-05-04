import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/images/BT LOGO.jpg";

export default function Sidebar() {
  return (
    <>
      <div className={`${styles.sidebar_hemburger} ${styles.hemburger}`}>
        <div className={`${styles.admin_image} ${styles.image_admin}`}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}
