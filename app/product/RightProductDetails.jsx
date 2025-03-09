"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addItem } from "../../redux/cart/cartSlice";
import { IoChevronForward } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";

const RightProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const isInCart = cart.some((item) => item.id === product.id);

  const handleCartAction = () => {
    if (isInCart) {
      router.push("/checkout");
    } else {
      if (!selectedSize) return;
      dispatch(addItem({ ...product, size: selectedSize, quantity: 1 }));
    }
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="Right-Product-Detail p-4 bg-white rounded-lg shadow-md">
      {/* Product Title & Rating */}
      <div className="Name-Title-Rating mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">{product?.name}</h1>
        <h2 className="text-lg text-gray-600 mb-2">{product?.print}</h2>
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-1">{product?.rating}</span>
          <FaStar className="text-yellow-500 mr-1" />
          <span>({product?.reviews}K reviews)</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center mb-2">
        <h1 className="text-xl font-bold text-gray-900 mr-2">₹{product?.price}</h1>
        <h1 className="text-base text-gray-500 line-through mr-2">MRP ₹{product?.mrp}</h1>
        <h1 className="text-pink-500 font-semibold">({product?.discount}% OFF)</h1>
      </div>

      <div className="text-green-600 mb-4">
        {product?.inclusiveOfTaxes ? "Inclusive of all taxes" : "Taxes not included"}
      </div>

      {/* Size Selection */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Select Size</span>
          <IoChevronForward className="text-gray-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(product?.stock || {}).map(([size, quantity]) => (
            <div
              key={size} // ✅ Unique key fix
              onClick={() => quantity > 0 && setSelectedSize(size)}
              className={`rounded-full border-2 p-2 text-center w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                quantity > 0
                  ? selectedSize === size
                    ? "border-pink-600 bg-pink-100 text-pink-600"
                    : "border-pink-500 text-pink-500 hover:bg-pink-100 hover:border-pink-600 hover:text-pink-600"
                  : "border-gray-300 text-gray-300 cursor-not-allowed opacity-50"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
        {!selectedSize && <p className="text-red-500 text-sm mt-2">Please select a size before adding to cart.</p>}
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleCartAction}
          disabled={!selectedSize}
          className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none ${
            !selectedSize
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isInCart
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
        >
          <GiShoppingBag className="mr-2" />
          {isInCart ? "Checkout" : "Add To Cart"}
        </button>
        <button className="flex items-center border border-pink-500 hover:bg-pink-50 hover:border-pink-600 text-pink-500 hover:text-pink-600 py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none">
          <CiHeart className="mr-2" />
          Wishlist
        </button>
      </div>

      {/* Product Details */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleDetails}>
          <h3 className="text-lg font-medium text-gray-800">Product Details</h3>
          {showDetails ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showDetails && (
          <div className="mt-2 text-gray-700 transition-all duration-300 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg">
            <table className="w-full border-collapse">
              <tbody className="text-left">
                {[
                  ["PRODUCT ID", product?.productId],
                  ["Category", product?.category],
                  ["Color", product?.color],
                  ["Print", product?.print],
                  ["Neck", product?.neck],
                  ["Pockets", product?.pockets ? "Yes" : "No"],
                  ["Sleeves", product?.sleeves],
                  ["Shape", product?.shape],
                  ["Length", product?.length],
                  ["Material", product?.material],
                  ["Size & Fit", product?.fit],
                ].map(([label, value], index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-gray-200 transition-all duration-200">
                    <td className="py-2 px-3 font-medium">{label}:</td>
                    <td className="py-2 px-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightProductDetails;
