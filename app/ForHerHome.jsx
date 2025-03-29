"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/cart/allProductSlice";

const ForHerHome = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }
console.log(products)
  return (
    <div className="ForHerHome p-8 bg-white mt-5">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Discover Our New Arrivals</h2>
        <p className="text-gray-600 mt-2">Find the latest trends and styles, curated just for you.</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              key={product?._id || index}
              productId={product?.productId}
              img={product?.imageOne || "/default.jpg"}
              mrp={product?.mrp || "N/A"}
              price={product?.price || "N/A"}
              discount={product?.discount || "No Discount"}
              name={product?.name || "Unknown Product"}
              rate={product?.rating || "No Rating"}
              description={`A stylish ${product?.color} ${product?.category} made of ${product?.material}. Features a ${product?.neck} neckline and ${product?.sleeves} sleeves for a ${product?.fit} fit.`}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ForHerHome;
