"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addItem } from "../../redux/cart/cartSlice";
import { openSizeChart } from "@/redux/cart/openCartSlice";
import { setColorImg, resetColorImg } from "@/redux/cart/colorImgSlice";
import { IoChevronForward } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import RightSlideMesurments from "../components/RightSlideMesurments";

const RightProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Parse color names and images
  const colorNames = product?.color?.split(",").map((c) => c.trim()) || [];
  // above we have taken into array of color names from product.color, which is a string of colors separated by commas
  const imageArray = [
    product?.imageOne,
    product?.imageTwo,
    product?.imageThree,
    product?.imageFour,
    product?.imageFive,
    product?.imageSix,
  ].filter(Boolean);

  // Map color to image
  const productImgColor = colorNames.map((color, idx) => ({
    color,
    image: imageArray[idx] || imageArray[0] || "",
  }));

  useEffect(() => {
    // Reset color image when component mounts
    dispatch(
      setColorImg({
        color: productImgColor[0]?.color || "",
        image: productImgColor[0]?.image || "",
      })
    );
    // Reset color image when product changes
  }, [dispatch]);

  // Add to Cart handler
  const handleCartAction = () => {
    if (!selectedSize || !selectedColor) return;

    dispatch(
      addItem({
        productId: product.productId,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        image: selectedColor.image,
        color: selectedColor.color,
        size: selectedSize,
        quantity: 1,
        id: `${product.productId}-${selectedColor.color}-${selectedSize}`,
      })
    );

    setSelectedSize(null);
    setSelectedColor(null);
    alert("Item added to cart successfully!");
  };

  // Checkout handler
  const handleCheckout = () => {
    // Optionally add to cart before checkout if not already there
    const exists = cart.some(
      (item) =>
        item.productId === product.productId &&
        item.color === selectedColor.color &&
        item.size === (selectedSize || "not selected")
    );
    if (!exists) {
      dispatch(
        addItem({
          productId: product.productId,
          name: product.name,
          price: product.price,
          mrp: product.mrp,
          discount: product.discount,
          image: selectedColor.image,
          color: selectedColor.color,
          size: selectedSize || "not selected",
          quantity: 1,
          id: `${product.productId}-${selectedColor.color}-${selectedSize || "notselected"}`,
        })
      );
    }
    router.push("/checkout");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-xl mx-auto transition-all duration-300 ease-in-out">
      {/* Title and rating */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
        <h2 className="text-lg text-gray-600 mb-2">{product?.print}</h2>
        <div className="flex items-center text-sm text-gray-700">
          <span className="mr-1">{product?.rating}</span>
          <FaStar className="text-yellow-500 mr-1" />
          <span>({product?.reviews}K reviews)</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 mr-2">
          ₹{product?.price}
        </h1>
        <h1 className="text-base text-gray-500 line-through mr-2">
          MRP ₹{product?.mrp}
        </h1>
        <h1 className="text-pink-500 font-semibold">
          ({product?.discount}% OFF)
        </h1>
      </div>

      {/* Tax */}
      <div className="text-green-600 mb-4 text-sm font-medium">
        {product?.inclusiveOfTaxes
          ? "Inclusive of all taxes"
          : "Taxes not included"}
      </div>

      {/* Select Size */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Select Size</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(openSizeChart())}
              className="px-4 mr-2 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md 
          hover:bg-pink-600 hover:shadow-lg 
          active:bg-pink-700 active:scale-95 
          transition duration-200 ease-in-out"
            >
              Open Size Chart
            </button>
            <IoChevronForward className="text-gray-500" />
            {/* Want Stitching Button */}
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition ml-2"
              onClick={() => {
                // WhatsApp number (with country code, e.g., +91 for India)
                const phone = "919945752429";
                // Compose message
                const msg = `Hello, I am interested in stitching for:\nProduct: ${product?.name}\nColor: ${selectedColor?.color || "Not selected"}\nSize: ${selectedSize || "Not selected"}\nProduct ID: ${product?.productId}`;
                // WhatsApp URL
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                window.open(url, "_blank");
              }}
            >
              Want Stitching?
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(product?.stock || {}).map(([size, quantity]) => {
            const isSelected = selectedSize === size;
            const isAvailable = quantity > 0;
            return (
              <div
                key={size}
                onClick={() => isAvailable && setSelectedSize(size)}
                className={`rounded-full border-2 p-2 text-center w-10 h-10 flex items-center justify-center cursor-pointer transform transition-all duration-200 ease-in-out
            ${
              isAvailable
                ? isSelected
                  ? "border-pink-600 bg-pink-600 text-white shadow-lg scale-105"
                  : "border-pink-300 text-pink-600 hover:border-pink-600 hover:bg-pink-100"
                : "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
            }`}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Color */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">Select Color</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          {productImgColor
            .filter((imgObj) => !!imgObj.image)
            .map((imgObj, index) => {
              const isSelected = selectedColor?.color === imgObj.color;
              return (
                <div key={index} className="text-center">
                  <div
                    onClick={() => {
                      setSelectedColor(imgObj);
                      dispatch(setColorImg(imgObj)); // <-- Store color and image in Redux
                    }}
                    className={`w-20 h-20 border-4 rounded-xl overflow-hidden cursor-pointer transform transition duration-300
                      ${
                        isSelected
                          ? "border-pink-600 scale-105 shadow-xl"
                          : "border-gray-300 hover:scale-105 hover:border-pink-400"
                      }`}
                  >
                    <Image
                      src={imgObj.image}
                      alt={`Product color option: ${imgObj.color}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{imgObj.color}</div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleCartAction}
          disabled={!selectedSize || !selectedColor}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform
            ${
              selectedSize && selectedColor
                ? "bg-pink-500 hover:bg-pink-600 active:scale-95"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Add to Cart
        </button>
        <button
          onClick={handleCheckout}
          className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform
             bg-pink-600 hover:bg-pink-700 active:scale-95"
        >
          Checkout Now
        </button>
      </div>
      <RightSlideMesurments />
    </div>
  );
};

export default RightProductDetails;
