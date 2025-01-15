"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LoginModal from "./LoginUser/LoginModal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63", // Pink color for the primary theme
    },
    secondary: {
      main: "#f48fb1", // Lighter pink for secondary theme
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const LogInUserDetail = () => {
  const [openLoginBox, setOpenLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false,
    jwt: "none",
    userId: "",
    userName: "",
    userNumber: "",
    userEmail: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openLoginModal = () => {
    setOpenLogin(true);
  };

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In initiated!");
    // Mock successful login
    setLoggedInUser({
      isLoggedIn: true,
      jwt: "sample_jwt_token",
      userId: "12345",
      userName: "Jane Doe",
      userNumber: "9876543210",
      userEmail: "jane.doe@example.com",
    });
    setOpenLogin(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="LoginUser-Detail" style={{ padding: "10px" }}>
        {loggedInUser.isLoggedIn ? (
          <div className="logged-In-User">
            <div onClick={handleClick} className="mr-5">
              <Avatar
                alt={loggedInUser.userName}
                src="https://photosbulk.com/wp-content/uploads/2024/08/hijab-girl-pic_108.webp"
              />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Orders</MenuItem>
              <MenuItem
                onClick={() => {
                  setLoggedInUser({
                    isLoggedIn: false,
                    jwt: "none",
                    userId: "",
                    userName: "",
                    userNumber: "",
                    userEmail: "",
                  });
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="loggedOut">
            <div
              className="text-gray-500 pr-4 hover:text-pink-400 hover:scale-105 cursor-pointer"
              onClick={openLoginModal}
            >
              Login
            </div>
          </div>
        )}
      </div>

      {/* Login Modal Integration */}
      <LoginModal
        isOpen={openLoginBox}
        onClose={closeLoginModal}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </ThemeProvider>
  );
};

export default LogInUserDetail;
