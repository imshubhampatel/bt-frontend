import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Components/SignIn/SignIn";

export default function ManageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/otp-varification" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
