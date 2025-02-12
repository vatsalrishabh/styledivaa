"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ productId, img, discount, name, rate }) => {
  const router = useRouter();

  const handleSeeDetails = () => {
    // Navigate to the product details page
    router.push(`/product/${productId}`);
  };

  return (
    <div className="Img-Card bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={img} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-red-500 font-bold">{discount} OFF</p>
        <p className="text-gray-700">{rate}</p>

        {/* See Details Button */}
        <button
          onClick={handleSeeDetails}
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
