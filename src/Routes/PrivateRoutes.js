import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Helpers/auth.helper";

function PrivateRoutes({ children }) {
  let auth = isAuthenticated();
  return auth ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoutes;
