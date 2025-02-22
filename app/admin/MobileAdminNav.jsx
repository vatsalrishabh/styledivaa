"use client"; // Ensure it's a client component

import React from "react";
import Link from "next/link";

// Icons
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const MobileAdminNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white p-2 flex justify-around items-center shadow-md z-10">
      <Link href="/admin/manageorder" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <ListAltIcon />
        <span>Orders</span>
      </Link>

      <Link href="/admin/additems" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <AddCircleOutlineIcon />
        <span>Add Items</span>
      </Link>

      <Link href="/admin/payments" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <PaymentIcon />
        <span>Payments</span>
      </Link>

      <Link href="/admin/gallery" className="flex flex-col items-center text-xs hover:text-gray-300 transition">
        <PhotoLibraryIcon />
        <span>Gallery</span>
      </Link>
    </div>
  );
};

export default MobileAdminNav;
