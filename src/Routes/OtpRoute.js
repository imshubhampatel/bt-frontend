import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Helpers/auth.helper";

function OtpRoute({ children }) {
  let isLogin = JSON.parse(localStorage.getItem("is_login"));
  if (!isLogin) {
    return <Navigate to="/sign-in" />;
  }
  if (isLogin && isAuthenticated()) {
    return <Navigate to="/super-admin/dashboard" />;
  }
  if (isLogin) {
    return children;
  }
}

export default OtpRoute;
