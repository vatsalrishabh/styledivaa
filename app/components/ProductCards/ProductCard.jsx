"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ productId, img, discount, name, rate, description, price }) => {
  const router = useRouter();

  const handleSeeDetails = () => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* ✅ Fix: Only render Image if img is valid, else show a placeholder */}
      {img ? (
        <Image 
          src={img} 
          alt={name} 
          width={300} 
          height={200} 
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm truncate">{description}</p>
        <p className="text-red-500 font-bold mt-2">{discount} OFF</p>
        <p className="text-gray-700 font-semibold">Price: ₹{price}</p>
        <p className="text-gray-500 text-sm">Rating: {rate} ⭐</p>

        <button
          onClick={handleSeeDetails}
          className="mt-4 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
