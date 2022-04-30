import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";
import VerifyOtp from "../Components/Otp/VerifyOtp";

export default function ManageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/otp-varification" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
}
