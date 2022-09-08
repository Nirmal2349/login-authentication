import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
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
      <div className="banner">
        <h4>Trade-in offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>save more with coupons & upto 70% off!</p>
        <button className="btw__shop">Shop</button>
      </div>
      {/* <div>
        <img src="https://swall.teahub.io/photos/small/356-3567567_paradise-valley-arizona-luxury-homes.jpg" />
      </div> */}
    </div>
  );
}
