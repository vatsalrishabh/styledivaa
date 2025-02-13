"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AfterLogin = ({ userName, userEmail,userId, userMobile, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="AfterLogin lg:pr-8">
      {/* Avatar */}
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Avatar
          alt={userName || "User"}
          src={userEmail?.includes("@") ? "https://photosbulk.com/wp-content/uploads/2024/08/hijab-girl-pic_108.webp" : undefined}
        />
      </div>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AfterLogin;
