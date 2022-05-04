import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import VerifyOtp from "../Components/Otp/VerifyOtp";
import ShowSuccess from "../Components/Alert/ShowSuccess";
import ShowError from "../Components/Alert/ShowError";
import Layout from "../Components/Page/Layout/Layout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "../Routes/PrivateRoutes";
export default function ManageRoutes() {
  return (
    <>
      <BrowserRouter>
        <ShowSuccess />
        <ShowError />
        <Routes>
          <Route
            path="/super-admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/otp-verification" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
