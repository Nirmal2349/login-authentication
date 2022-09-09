import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Profile } from "./components/Profile";
import { Login } from "./components/login";
import { Signup } from "./components/signup";

export default function APP() {
  return (
    <BrowserRouter>
      <div className="App">
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
