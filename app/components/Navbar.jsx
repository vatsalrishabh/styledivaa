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
  const [activeTab, setActiveTab] = useState("Home"); // Track active tab
  const [scrollNum, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Log scroll position every time the user scrolls
      console.log("Scroll position: " + window.scrollY);

      // Check if the scroll position is greater than 50 pixels
      if (window.scrollY > 55) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setLoggedInUser(userData);
          }
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

  return (
    <div className=" w-full h-[100vh] bg-custombg  text-white">
      {/* Laptop navigation */}
      <div
        className={`${
          scrollNum
            ? "hidden lg:flex w-full pt-0  justify-center fixed mt-0"
            : "hidden lg:flex w-full pt-16   justify-center fixed mt-0 "
        }`}
      >
        <div
          className={`${
            scrollNum
              ? "bg-white w-full h-[12vh] flex items-center shadow-lg "
              : "bg-white w-4/5 h-[12vh] flex items-center shadow-lg rounded-lg"
          }`}
        >
          <div className="logo w-1/6 flex justify-center items-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
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
          <div
            className={`${scrollNum ? "" : "breaker w-2 bg-gray-200 h-[100%]"}`}
          ></div>
          {/* this is the breaker */}

          <div className={`${scrollNum ? "" : "onlyBg bg-custombg h-[100%]"}`}>
            <div
              className={`${
                scrollNum
                  ? "bg-white  h-[105%] w-fit flex justify-end pl-24"
                  : "bg-[#F7F7F7] mt-1 h-[105%] w-fit flex justify-end pl-24"
              }`}
            >
              <div className="icons flex space-x-4 items-center px-4">
                <div>
                  <Search className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink" />
                </div>

                <ShoppingCart className="cursor-pointer hover:scale-110 transition-all duration-300 text-customIcon hover:text-brightPink" />
              </div>
            </div>
          </div>
        </div>

        {/* search dropdown starts */}
       
        {/* search dropdown ends */}
      </div>

      {/* Smartphone navigation */}
      <div className="sm:hidden">
        <AnNavbar />
      </div>
      {/* Add your smartphone nav code here */}
      
    </div>
  );
};

export default Navbar;
