import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import logo from "../../assets/images/BT LOGO.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";

//? material ui

const SignIn = () => {
  const [showText, SetShowText] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [userAuthData, setUserAuthData] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      alert("called");
      return <Navigate to="/otp-varification" />;
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let config = {
        method: "post",
        url: "http://localhost:5001/api/v1/super-admin/sign-in",
        data: Values,
      };
      let { data } = await axios(config);
      console.log(data);
      setUserAuthData(data);
      setLoading(false);
      setSuccess(true);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log("hye", error.response.data);
      setError(error.response.data.data.message);
    }
  };
  return (
    <>
      <div className={`${styles.header}  `}>
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
              {error && <p>{error}</p>}
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
    </>
  );
};

export default SignIn;
