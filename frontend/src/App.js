import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function APP() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="bottom-center" limit={1} />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// function Logout(){

//   return(

//   )
// }
