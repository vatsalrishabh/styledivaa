"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/cart/allProductSlice";

const AllFemaleProducts = ({ category }) => {  
  const dispatch = useDispatch(); // put all the category of products in the store
  const products = useSelector((state) => state.allProducts.products);  //get all the products from store
  const [categorySpecific, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
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

  // Filter products by category
  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (eachProduct) => eachProduct.category === category
      );
      setCategoryProducts(filteredProducts);
    }
  }, [products, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (!categorySpecific.length) {
    return (
      <p className="text-center text-pink-500 text-lg">
     
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 text-center my-6">
        {category.toUpperCase()}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorySpecific.map((product, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default AllFemaleProducts;
