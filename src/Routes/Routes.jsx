import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import VerifyOtp from "../Components/Otp/VerifyOtp";
import ShowSuccess from "../Components/Alert/ShowSuccess";
import ShowError from "../Components/Alert/ShowError";
export default function ManageRoutes() {
  return (
    <>
      <BrowserRouter>
        <ShowSuccess />
        <ShowError />
        <Routes>
          <Route path="/" element={<Navigate to="sign-in" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/otp-verification" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
