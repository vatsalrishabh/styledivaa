"use client"; // Mark as client component

import React from "react";
import Link from "next/link";

// Icons
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const LeftLaptoSideNav = () => {
  return (
    <div className=" lg:block hidden w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <h2 className="text-xl font-semibold mb-6 text-center">Admin Panel</h2>

      <nav>
        <ul className="space-y-4 ">
          <li>
            <Link
              href="/admin/manageorder"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <ListAltIcon />
              Manage Orders
            </Link>
          </li>

          <li>
            <Link
              href="/admin/additems"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <AddCircleOutlineIcon />
              Add Items
            </Link>
          </li>

          <li>
            <Link
              href="/admin/payments"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <PaymentIcon />
              Payments
            </Link>
          </li>

          <li>
            <Link
              href="/admin/gallery"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              <PhotoLibraryIcon />
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftLaptoSideNav;
