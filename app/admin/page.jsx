"use client";
import React, { useState, useEffect } from "react";
import LeftLaptoSideNav from "./LeftLaptoSideNav";
import MobileAdminNav from "./MobileAdminNav";
import RLaptopSideNav from "./RLaptopSideNav";
import AdminLoginPage from "./additems/AdminLoginPage";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminDetails = localStorage.getItem("adminDetails");
      setIsAuthenticated(!!adminDetails);
    };

    checkAuth();

    // Listen for storage changes (logout)
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <MobileAdminNav />
          <div className="flex">
            <LeftLaptoSideNav />
            <RLaptopSideNav />
          </div>
        </>
      ) : (
        <AdminLoginPage />
      )}
    </div>
  );
};

export default Page;
