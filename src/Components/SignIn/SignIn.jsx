import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import logo from "../../assets/images/BT LOGO.jpg";

//? material ui

import { TextField, InputLabel } from "@mui/material";

const SignIn = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.img_wrapper}>
            <img src={logo} alt="img" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.form_wrapper}>
            <form className={styles.form}>
              <div className={styles.greeting_wrapper}>
                <p className={styles.greeting}>Welcome Back!</p>
                <p className={styles.general_msg}>Login to continue</p>
              </div>
              <InputLabel className={styles.label}>Email</InputLabel>
              <TextField />
              <br />
              <InputLabel className={styles.label}>Password</InputLabel>
              <TextField />
              <br />
              <br />
              <button className={styles.login_btn}>this</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
