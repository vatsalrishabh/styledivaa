"use client";
import React from "react";

const DashboardCard = ({ heading, number, bgImage, bgColor }) => {
  return (
    <div
      className=" p-6 rounded-xl shadow-lg text-white flex flex-col justify-between transform transition hover:scale-105"
      style={{
        backgroundColor: bgColor ?? "#1f2937", // Default dark gray if no color provided
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability when an image is used */}
      {bgImage && <div className="absolute inset-0 bg-black/50 rounded-xl"></div>}

      {/* Card Content */}
      <div className=" z-10">
        <h2 className="text-lg font-semibold">{heading ?? "N/A"}</h2>
        <p className="text-3xl font-bold mt-2">{number ?? "0"}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
