"use client";

import React from "react";
import Image from "next/image";

const LeftImgProduct = ({ product }) => {
  const images = [
    product?.imageOne,
    product?.imageTwo,
    product?.imageThree,
    product?.imageFour,
    product?.imageFive,
    product?.imageSix,
  ].filter(Boolean); // Removes empty image URLs

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={img}
              alt={`Product Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No images available</p>
      )}
    </div>
  );
};

export default LeftImgProduct;
