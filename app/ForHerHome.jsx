"use client";

import React, { useState } from "react";
import { IoCaretBackOutline, IoCaretForward } from "react-icons/io5";
import ProductCard from "./components/ProductCards/ProductCard";

const ForHerHome = () => {
  const [forHer, setForHer] = useState([
    {
      id: 1,
      img: "https://m.media-amazon.com/images/I/91C7JjVhvxL._AC_UY1100_.jpg",
      discount: "20%",
      name: "Elegant Dress",
      rate: "$49.99",
      sizes: {
        XL: "available",
        L: "available",
        M: "out of stock",
      },
    },
    {
      id: 2,
      img: "https://assets.ajio.com/medias/sys_master/root/20230808/za8L/64d170b4eebac147fcb12c5c/-473Wx593H-466431051-navy-MODEL.jpg",
      discount: "15%",
      name: "Casual Shirt",
      rate: "$29.99",
      sizes: {
        XL: "available",
        L: "out of stock",
        M: "available",
      },
    },
    {
      id: 3,
      img: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/1/51f3766DR011543_1.jpg?rnd=20200526195200&tr=w-512",
      discount: "30%",
      name: "Summer Top",
      rate: "$19.99",
      sizes: {
        XL: "out of stock",
        L: "available",
        M: "available",
      },
    },
  ]);

  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="ForHerHome p-6 bg-gray-100 mt-5">
      {/* Header Section */}
      <div className="flex justify-center items-center mb-6">
        <button className="icon p-2 text-pink-500 hover:text-pink-700">
        <IoCaretForward size={34} />
        </button>
        <h2 className="text-2xl font-bold mx-4 text-gray-600">
          New Products For Her
        </h2>
        <button className="icon p-2 text-pink-500 hover:text-pink-700">
        <IoCaretBackOutline size={34} />
        </button>
      </div>

      {/* Cart Info */}
      

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forHer.map((item) => (
          <ProductCard
            key={item.id}
            productId={item.id}
            img={item.img}
            discount={item.discount}
            name={item.name}
            rate={item.rate}
            sizes={item.sizes}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ForHerHome;
