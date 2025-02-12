"use client";
import React, { useState } from 'react';
import { IoChevronForward } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";

const RightProductDetails = () => {
  const sizes = {
    XS: 'available',
    S: 'not available',
    M: 'available',
    L: 'available',
    XL: 'available',
    XXL: 'not available',
  };

  const productDetails = {
    productId: "AB12345",
    color: "Green",
    print: "Bandhani printed",
    neck: "Round neck",
    pockets: "Has 2 pockets",
    sleeves: "Sleeveless, regular sleeves",
    shape: "A-line shape with regular style",
    length: "Calf length with flared hem",
    material: "Machine weave regular cotton",
    modelFit: "The model (height 5'8) is wearing a size S",
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='Right-Product-Detail p-4 bg-white rounded-lg shadow-md'>
      <div className="Name-Title-Rating mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Meeranshi</h1>
        <h2 className="text-lg text-gray-600 mb-2">Bandhani Printed Cotton Kurta</h2>
        <div className='flex items-center text-sm text-gray-700'>
          <div className='flex items-center mr-2'>
            <span className="mr-1">4.3</span>
            <FaStar className="text-yellow-500 mr-1" />
            <span>(2.3K)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <h1 className='text-xl font-bold text-gray-900 mr-2'>₹599</h1>
        <h1 className='text-base text-gray-500 line-through mr-2'>MRP ₹1999</h1>
        <h1 className='text-pink-500 font-semibold'>(70% OFF)</h1>
      </div>

      <div className="text-green-600 mb-4">inclusive of all taxes</div>

      <div className="mb-4">
        <div className='flex items-center justify-between mb-2'>
          <span className="text-gray-700">Select Size</span>
          <IoChevronForward className="text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(sizes).map(([size, availability]) => (
            <div
              key={size}
              className={`rounded-full border-2 p-2 text-center w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                availability === 'available'
                  ? 'border-pink-500 text-pink-500 hover:bg-pink-100 hover:border-pink-600 hover:text-pink-600'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed opacity-50' // Added opacity for unavailable
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4"> {/* Added margin bottom here */}
        <button className="flex items-center bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none">
          <GiShoppingBag className="mr-2" />
          Add To Cart
        </button>
        <button className="flex items-center border border-pink-500 hover:bg-pink-50 hover:border-pink-600 text-pink-500 hover:text-pink-600 py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none">
          <CiHeart className="mr-2" />
          Wishlist
        </button>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleDetails}>
          <h3 className="text-lg font-medium text-gray-800">Product Details</h3>
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showDetails && (
          <div className="mt-2 text-gray-700 transition-all duration-300"> {/* Added transition */}
            <p><span className="font-medium">PRODUCT ID:</span> {productDetails.productId}</p>
            <p><span className="font-medium">Colour:</span> {productDetails.color}</p>
            <p><span className="font-medium">Print:</span> {productDetails.print}</p>
            <p><span className="font-medium">Neck:</span> {productDetails.neck}</p>
            <p><span className="font-medium">Pockets:</span> {productDetails.pockets}</p>
            <p><span className="font-medium">Sleeves:</span> {productDetails.sleeves}</p>
            <p><span className="font-medium">Shape:</span> {productDetails.shape}</p>
            <p><span className="font-medium">Length:</span> {productDetails.length}</p>
            <p><span className="font-medium">Material:</span> {productDetails.material}</p>
            <div className="mt-2">
              <span className="font-medium">Size & Fit:</span>
              <p>{productDetails.modelFit}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightProductDetails;