import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import styles from "./VerifyOtp.module.css";
import logo from "../../assets/images/BT LOGO.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { getToken, sendOtp, verifyOtp } from "../../Features/auth/authSlice";
import { useEffectOnce } from "../../Helpers/useEffect";
import { showError, showMessage } from "../../Features/alert/alertSlice";
import { isAuthenticated } from "../../Helpers/auth.helper.js";

const VerifyOtp = () => {
  const [pressedKey, setPressedKey] = useState("");
  let nevigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token,
    loading,
    success,
    error,
    isOtpVerified,
    isLoggedIn,
    isOtpSent,
    isAuthenticated: isAuth,
  } = useSelector((state) => state.auth);
  console.log(loading);

  useEffect(() => {
    // dispatch(getAccessToken());
  }, [isLoggedIn]);

  if (error) {
    dispatch(showError("Incorrect otp"));
  }

  if (success) {
    setTimeout(() => {
      nevigate("/super-admin/dashboard");
    }, 1000);
  }

  useEffect(() => {
    if (!isAuth) {
      nevigate("/sign-in");
    }
    if (isAuthenticated()) {
      nevigate("/super-admin/dashboard");
    }
  }, []);

  //sending otp

  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const redirectHandler = () => {};
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let finalOtp = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}${otp.otp6}`;
    console.log(finalOtp.length);
    if (finalOtp !== "" && finalOtp.length == 6) {
      dispatch(verifyOtp({ token: token, otp: finalOtp }));
      return;
    }
    dispatch(showError("Please enter OTP first"));
  };

  const inputFocus = (elmnt) => {
    console.log(elmnt.key);
    if (pressedKey == "Delete" || pressedKey == "Backspace") return;
    console.log("next");
    const next = elmnt.target.tabIndex;
    if (next < 6) {
      elmnt.target.form.elements[next].focus();
    }
  };

  useEffectOnce(() => {
    dispatch(getToken());
  }, []);

  const otpDelete = (elmnt) => {
    setPressedKey(elmnt.key);
    console.log(elmnt.key);
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };
  const onChangeHandler = (name) => (e) => {
    console.log(e.target.value);
    inputFocus(e);
    setOtp({ ...otp, [name]: e.target.value });
  };

  useEffectOnce(() => {
    if (token) {
      dispatch(sendOtp(token));
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.header}  `}>
          {redirectHandler()}
          <div className={`${styles.container}  `}>
            <div className={`${styles.signIn_styles} ${styles}`}>
              <div className={`${styles.logo} ${styles.image}`}>
                <img src={logo} alt="college_logo" />
              </div>
              <form
                onSubmit={onSubmitHandler}
                className={`${styles.form_otp} ${styles}`}
              >
                <h1 style={{ textAlign: "center" }}>Welcome to BTIRT </h1>
                <input
                  type="text"
                  name="otp1"
                  autoComplete="off"
                  onChange={onChangeHandler("otp1")}
                  tabIndex="1"
                  maxLength={1}
                  onKeyUp={(e) => otpDelete(e)}
                  value={otp.otp1}
                />
                <input
                  type="text"
                  name="otp2"
                  maxLength="1"
                  autoComplete="off"
                  onChange={onChangeHandler("otp2")}
                  tabIndex="2"
                  onKeyUp={(e) => otpDelete(e)}
                  value={otp.otp2}
                />
                <input
                  type="text"
                  name="otp3"
                  maxLength="1"
                  autoComplete="off"
                  onChange={onChangeHandler("otp3")}
                  tabIndex="3"
                  value={otp.otp3}
                  onKeyUp={(e) => otpDelete(e)}
                />
                <input
                  type="text"
                  name="otp4"
                  maxLength={1}
                  autoComplete="off"
                  onChange={onChangeHandler("otp4")}
                  onKeyUp={(e) => otpDelete(e)}
                  tabIndex="4"
                  value={otp.otp4}
                />
                <input
                  type="text"
                  name="otp5"
                  maxLength={1}
                  autoComplete="off"
                  onChange={onChangeHandler("otp5")}
                  onKeyUp={(e) => otpDelete(e)}
                  tabIndex="5"
                  value={otp.otp5}
                />
                <input
                  type="text"
                  name="otp6"
                  maxLength={1}
                  autoComplete="off"
                  onChange={onChangeHandler("otp6")}
                  onKeyUp={(e) => otpDelete(e)}
                  tabIndex="6"
                  value={otp.otp6}
                />
                <div style={{ textAlign: "center" }}>
                  Don't receive OTP ?{" "}
                  <span className={styles.resendOtp} style={{ color: "red" }}>
                    Resend Otp
                  </span>
                </div>
                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyOtp;
