import React from "react";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <div className={`${styles.container} ${styles.main_layout}`}>
        <div className={`${styles.sideBar} ${styles.bar}`}>
          <Sidebar />
        </div>
        <div className={`${styles.layout_header} ${styles}`}>
          <div className={`${styles.header} ${styles.side_header}`}>
            <Header />
          </div>
          <div className={`${styles.layout} ${styles.layout_children}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
