'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const LeftImgProduct = ({ product }) => {
  // Access color and img from Redux store
  const { color, img } = useSelector((state) => state.colorImg);

  // Local state to track selected image and color
  const [selectedImg, setSelectedImg] = useState(img);
  const [selectedColor, setSelectedColor] = useState(color);

  // Update local state whenever Redux store changes
  useEffect(() => {
    setSelectedImg(img);
    setSelectedColor(color);
  }, [img, color]);

  const images = [
    product?.imageOne,
    product?.imageTwo,
    product?.imageThree,
    product?.imageFour,
    product?.imageFive,
    product?.imageSix,
  ].filter(Boolean);

  // If an image is selected via color, show that image only
  if (selectedImg) {
    return (
      <div className="p-5 flex justify-center items-center">
        <div className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden rounded-lg shadow-lg bg-white">
          <Image
            src={selectedImg}
            alt={`Selected color: ${selectedColor}`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>
      </div>
    );
  }

  // Show all product images otherwise
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
