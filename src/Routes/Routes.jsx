import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/otp-verification" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
