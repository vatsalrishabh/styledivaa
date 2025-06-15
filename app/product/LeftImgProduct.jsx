'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

const LeftImgProduct = ({ product }) => {
  const { color, img } = useSelector((state) => state.colorImg);
  const [selectedImg, setSelectedImg] = useState(img);
  const [selectedColor, setSelectedColor] = useState(color);
  const [hoveredImg, setHoveredImg] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerPos, setContainerPos] = useState({ top: 0, left: 0, width: 0, height: 0 });

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

  const handleMouseEnter = (img) => (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContainerPos({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setHoveredImg(img);
  };

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX - containerPos.left,
      y: e.clientY - containerPos.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  // Show single selected image based on color
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

  return (
    <div className="relative p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {images.length > 0 ? (
        images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onMouseEnter={handleMouseEnter(img)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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

      {/* Zoom Preview */}
      {hoveredImg && (
        <div
          className="fixed z-50 w-[90vw] h-[90vh] top-[5vh] left-[5vw] border-4 border-black rounded-xl overflow-hidden bg-white shadow-2xl pointer-events-none"
        >
          <div
            className="relative w-full h-full"
            style={{
              backgroundImage: `url(${hoveredImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${containerPos.width * 4}px ${containerPos.height * 4}px`,
              backgroundPosition: `-${mousePos.x * 3}px -${mousePos.y * 3}px`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LeftImgProduct;
