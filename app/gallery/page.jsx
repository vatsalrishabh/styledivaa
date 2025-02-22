"use client";
import React from "react";
import Footer from "../components/Footer";
import GalleryOne from "./GalleryOne";
import Navbar from "../components/Navbar";
import RightIconSmartphone from "../components/SmartphoneCartIcon/RightIconSmartphone";

const page = () => {
  return (
    <div className="Contact-us ">
      <Navbar />
      <GalleryOne />
      <RightIconSmartphone />    {/* this component has static cart icon in left, right slideshow */}
      <Footer />
    </div>
  );
};

export default page;
