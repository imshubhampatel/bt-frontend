import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import VerifyOtp from "../Components/Otp/VerifyOtp";
import ShowSuccess from "../Components/Alert/ShowSuccess";
import ShowError from "../Components/Alert/ShowError";
import Layout from "../Components/Layout/Layout/Layout";
import PrivateRoute from "../Routes/PrivateRoutes";
import { Dashboard, Events } from "../Pages/";
import News from "../Pages/News/News";
import { useDispatch } from "react-redux";
import { useEffectOnce } from "../Helpers/useEffect";
import { getToken } from "../Features/auth/authSlice";
import OtpRoute from "./OtpRoute";
import CreateNews from "../Components/News/CreateNews/CreateNews";
export default function ManageRoutes() {
  return (
    <>
      <BrowserRouter>
        <ShowSuccess />
        <ShowError />
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/otp-verification"
            element={
              <OtpRoute>
                <VerifyOtp />
              </OtpRoute>
            }
          />
          <Route
            path="/super-admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/super-admin/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/super-admin/news"
            element={
              <PrivateRoute>
                <News />
              </PrivateRoute>
            }
          />
          <Route
            path="/super-admin/create/news"
            element={
              <PrivateRoute>
                <CreateNews />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
