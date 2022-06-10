import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import logo from "../../assets/images/BT LOGO.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorAndSuccess,
  sendOtp,
  setUserDetails,
} from "../../Features/auth/authSlice";
import Loader from "../Loader/Loader";
import { isAuthenticated } from "../../Helpers/auth.helper.js";

//? material ui

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const state = useSelector((state) => state.auth);
  console.log(state);
  const { success, error, isLoggedIn, isOtpVerified, loading, token } = state;
  const [showText, SetShowText] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) {
      dispatch(clearErrorAndSuccess());
      navigate("/otp-verification");
      return;
    }
  }, [success]);

  const [FormError, setFormError] = useState({
    email: false,
    password: false,
  });

  let formValidation = () => {
    let isError = false;

    let err = {
      email: false,
      password: false,
    };

    if (Values.email === "") {
      isError = true;
      err.email = "Please enter email first";
    }
    if (Values.password === "") {
      isError = true;
      err.password = "Please enter password first";
    }
    setFormError(err);
    console.log(FormError);
    return isError;
  };

  useEffect(() => {
    if (Values.password.length == 0) {
      setShowEye(false);
      return;
    }
    setShowEye(true);
  }, [Values]);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/super-admin/dashboard");
      return;
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(Values);
    if (!formValidation()) {
      dispatch(setUserDetails(Values));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.header} ${loading && styles.header_blur}  `}>
          <div className={`${styles.container}  `}>
            <div className={`${styles.signIn_styles} ${styles}`}>
              <div className={`${styles.logo} ${styles.image}`}>
                <img src={logo} alt="college_logo" />
              </div>
              <form
                onSubmit={submitHandler}
                className={`${styles.form} ${styles}`}
              >
                <h1>Welcome to BTIRT </h1>
                {/* {success && <p>{userAuthData}</p>} */}

                <div className={`${styles.formBox} ${styles}`}>
                  {FormError?.email && (
                    <p id="errorHandler">{FormError.email}</p>
                  )}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username or email"
                    onChange={(e) =>
                      setValues({ ...Values, email: e.target.value })
                    }
                  />
                  <div>
                    <i className="fas fa-user-circle"></i>
                  </div>

                  {showEye && (
                    <span
                      className={styles.showpassword}
                      onClick={() => SetShowText(!showText)}
                    >
                      <i
                        className={`fas fa-${!showText ? "eye" : "eye-slash"}`}
                      ></i>
                    </span>
                  )}
                  <span></span>
                  {FormError?.password && (
                    <p id="errorHandler">{FormError.password}</p>
                  )}
                  <input
                    type={`${!showText ? "password" : "text"}`}
                    placeholder="password"
                    onChange={(e) =>
                      setValues({ ...Values, password: e.target.value })
                    }
                  />
                  <div>
                    <i className="fas fa-mars-stroke"></i>
                  </div>
                  <section className={`${styles.login} ${styles}`}>
                    <span className={`${styles.remember} ${styles}`}>
                      <input type="checkbox" id="remember" name="remember" />
                      <label htmlFor="remember">Remember me</label>
                    </span>
                    <input type="submit" value={"Login"} />
                  </section>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
