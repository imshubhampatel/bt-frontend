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


//? material ui

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const state = useSelector((state) => state.auth);
  console.log(state);
  const { success, error, loading, token } = state;
  const [showText, SetShowText] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [Values, setValues] = useState({
    email: "shubhampatel@appslure.com",
    password: "@shubham456",
  });

  useEffect(() => {
    if (Values.password.length == 0) {
      setShowEye(false);
      return;
    }
    setShowEye(true);
  }, [Values]);

  const redirectHandler = () => {
    if (success) {
      dispatch(clearErrorAndSuccess());
      navigate("/otp-verification");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(Values);
    dispatch(setUserDetails(Values));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.header} ${loading && styles.header_blur}  `}>
          {redirectHandler()}
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
                  <div>
                    <i className="fas fa-user-circle"></i>
                  </div>
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
                    <i className="fas fa-mars-stroke"></i>
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
                  <input
                    type={`${!showText ? "password" : "text"}`}
                    placeholder="password"
                    onChange={(e) =>
                      setValues({ ...Values, password: e.target.value })
                    }
                  />

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
