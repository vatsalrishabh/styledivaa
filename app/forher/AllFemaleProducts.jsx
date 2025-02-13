"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCards/ProductCard";

const AllFemaleProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(allProducts)
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setAllProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center text-pink-500 text-lg">Loading products...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">Failed to load products.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-pink-600 text-center my-6">
       For Her
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProducts.map((product, index) => (
  <ProductCard
    key={product.id || index}  // ✅ Ensure a unique key
    productId={product.id}
    img={product.imageUrls[0]}
    discount={product.discount}
    name={product.name}
    rate={product.rate}
    description={product.description}
    price={product.price}
  />
))}
      </div>
    </div>
  );
};

export default AllFemaleProducts;
