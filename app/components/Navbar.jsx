"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { Search, ShoppingCart } from "@mui/icons-material";
import logo from "../../public/assets/styledivaalogo.png";
import AnNavbar from "./AnNavbar";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrollNum, setScroll] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 55);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user details
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) setLoggedInUser(await res.json());
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const tabs = ["For Her", "For Him", "About Us", "Gallery", "Contact Us"];

  // Extracted common styles
  const navbarStyles = scrollNum
    ? "hidden lg:flex w-full pt-0 justify-center fixed shadow-lg"
    : "hidden lg:flex w-full pt-16 justify-center fixed";

  const whiteBoxStyles = scrollNum
    ? "bg-white w-full h-[12vh] flex items-center shadow-lg"
    : "bg-white w-4/5 h-[12vh] flex items-center shadow-lg rounded-lg";

  const iconContainerStyles = scrollNum
    ? "bg-white h-full flex justify-end px-8 items-center"
    : "bg-[#F7F7F7] h-full w-[216px] flex justify-end px-8 items-center translate-y-2 ";

  return (
    <div className="w-full h-screen bg-custombg text-white">
      {/* Laptop/Desktop Navigation */}
      <div className={navbarStyles}>
        <div className={whiteBoxStyles}>
          {/* Logo Section */}
          <div className="logo w-1/6 flex justify-center items-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* Tabs Section */}
          <div className="tabs w-4/6 flex justify-between text-lg font-semibold">
            {tabs.map((tab) => (
              <p
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                  activeTab === tab
                    ? "bg-brightPink text-white shadow-lg scale-110"
                    : "hover:bg-lightPink hover:text-brightPink text-customText"
                }`}
              >
                {tab}
              </p>
            ))}
          </div>

          {/* Icons Section */}
          <div className={scrollNum?'w-1/6 h-full flex':'w-1/6 h-full flex bg-custombg'}>
          <div className="w-[8px] bg-gray-200"></div>
            <div className={iconContainerStyles}>
              <div className="icons flex space-x-4 items-center">
                <Search className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink" />
                <ShoppingCart className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <AnNavbar />
      </div>
    </div>
  );
};

export default Navbar;
