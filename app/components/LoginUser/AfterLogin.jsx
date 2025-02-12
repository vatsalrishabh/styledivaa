"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AfterLogin = ({ userName, userEmail, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget); // Optional chaining to avoid errors if event is undefined
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="AfterLogin">
      {/* Avatar */}
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Avatar
          alt={userName || "User"} // Fallback to "User" if userName is undefined
          src={userEmail?.includes("@") ? "https://photosbulk.com/wp-content/uploads/2024/08/hijab-girl-pic_108.webp" : undefined} // Fallback to undefined if userEmail is invalid
        />
      </div>

      {/* Dropdown Menu */}
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
            handleClose();
            onLogout?.(); // Call onLogout if it's defined
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AfterLogin;
