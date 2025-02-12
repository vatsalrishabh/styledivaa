import React, { useState, useEffect } from 'react';
import BeforeLogin from './LoginUser/BeforeLogin';
import AfterLogin from './LoginUser/AfterLogin';

const LogInUserDetail = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false,
    jwt: "none",
    userId: "",
    userName: "",
    userNumber: "",
    userEmail: "",
  });

  // Function to set user details in localStorage
  const setUserDetails = (user) => {
    localStorage.setItem("userDetails", JSON.stringify(user));
    setLoggedInUser(user);
  };

  // Function to get user details from localStorage
  const getUserDetails = () => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  };

  // Use useEffect to get user details on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className='Login-User-Details'>
      {loggedInUser.isLoggedIn ? <AfterLogin /> : <BeforeLogin />}
    </div>
  );
};

export default LogInUserDetail;