"use client";

import React, { useState, useEffect } from "react";
import AfterLogin from "./LoginUser/AfterLogin";
import LoginRegistration from "./LoginUser/LoginRegistration";
import { jwtDecode } from "jwt-decode"; //to decode jwt comimg from server
import SnackBarr from "./SnackBarr";

const LogInUserDetail = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false,
    token: "",
    userName: "",
    userEmail: "",
    userNumber: "",
  });

  // Function to get user details from localStorage
  const getUserDetails = () => {
    let storedUser = localStorage.getItem("userDetails");

    if (storedUser) {
      try {
        storedUser = JSON.parse(storedUser);
        const decodedToken = jwtDecode(storedUser.token);

        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Session expired. Logging out...");
          logoutUser();
        } else {
          setLoggedInUser({
            isLoggedIn: true,
            token: storedUser.token,
            userName: decodedToken.name,
            userEmail: decodedToken.email,
            userNumber: decodedToken.mobile, // Changed to userNumber
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logoutUser();
      }
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem("userDetails");
    setLoggedInUser({
      isLoggedIn: false,
      token: "",
      userName: "",
      userEmail: "",
      userNumber: "",
    });
  };

  // Auto-check user details on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="Login-User-Details">
      <SnackBarr/>
      {loggedInUser.isLoggedIn ? (
        <AfterLogin
          userName={loggedInUser.userName}
          userEmail={loggedInUser.userEmail}
          userNumber={loggedInUser.userNumber} // Fixed typo
          onLogout={logoutUser}
        />
      ) : (
        <LoginRegistration />
      )}
    </div>
  );
};

export default LogInUserDetail;
