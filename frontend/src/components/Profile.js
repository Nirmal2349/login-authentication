import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

export function Profile() {
  // const [isLoggedin, setIsLoggedin] = useState(false);

  //   const logout = () => {
  //     localStorage.removeItem("jwtToken");
  //     setIsLoggedin(false);
  //   };

  const signoutHandler = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const navigate = useNavigate();
  useEffect(() => {
    let isAuthenticated = false;
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        isAuthenticated = true;
      }
    } catch (err) {
      console.log(err);
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
      <div>
        <h1>User is loggedin</h1>
        <button onClick={signoutHandler}>logout user</button>
      </div>
   
  );
}
