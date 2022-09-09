import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const signoutHandler = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  useEffect(() => {
    let isAuthenticated = false;
    let token = "";
    try {
      token = localStorage.getItem("jwtToken");
      if (token) {
        isAuthenticated = true;
      }
    } catch (err) {
      console.log(err);
    }
    if (!isAuthenticated) {
      navigate("/login");
    }

    async function getUserData() {
      const response = await fetch("/api/profile", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          authorization: token,
        },
      });
      const jsonResponse = await response.json();
      const data = JSON.parse(jsonResponse.msg);
      setUser(data);
    }
    getUserData();
  });

  return (
    <div>
      <span>fullname :</span>{" "}
      <span>
        {user.firstName} {user.lastName}
      </span>
      <p>
        <span>email :</span> <span>{user.emailAddress}</span>
      </p>
      <p>
        <span>age :</span> <span>{user.age}</span>
      </p>
      <p>
        <span>dob :</span> <span>{user.date}</span>
      </p>
      <p>
        <span>gender :</span> <span>{user.gender}</span>
      </p>
      <p>
        <span>Phonenumber :</span> <span>{user.phoneNumber}</span>
      </p>
      <button onClick={signoutHandler}>logout user</button>
    </div>
  );
}
