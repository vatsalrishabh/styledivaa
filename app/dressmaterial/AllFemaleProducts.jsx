"use client";

import axios from "axios";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/cart/allProductSlice";

const AllFemaleProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        dispatch(setProducts(response.data)); // store all the products to react-redux later fileter out and display 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (!products.length)
    return <p className="text-center text-pink-500 text-lg">Loading products...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 text-center my-6">Dress Material</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product?._id || index}
            productId={product?.productId}
            img={product?.imageOne || "/default.jpg"}
            discount={product?.discount || "No Discount"}
            name={product?.name || "Unknown Product"}
            rate={product?.rating || "No Rating"}
            description={product?.description || "No Description Available"}
            price={product?.price || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFemaleProducts;
