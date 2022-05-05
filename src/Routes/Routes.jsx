import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import VerifyOtp from "../Components/Otp/VerifyOtp";
import ShowSuccess from "../Components/Alert/ShowSuccess";
import ShowError from "../Components/Alert/ShowError";
import Layout from "../Components/Layout/Layout/Layout";
import PrivateRoute from "../Routes/PrivateRoutes";
import { Dashboard, Events } from "../Pages/";
export default function ManageRoutes() {
  return (
    <>
      <BrowserRouter>
        <ShowSuccess />
        <ShowError />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/otp-verification" element={<VerifyOtp />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}
