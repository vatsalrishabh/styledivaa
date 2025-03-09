"use client";
import React, { useEffect, useState } from "react";
import { Box, TextField, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductCard from "./ProductCard";

const DeleteItem = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([
    {
      productId: "P001",
      name: "Wireless Mouse",
      imageOne: "https://via.placeholder.com/150",
      price: 25.99,
      category: "Electronics",
      description: "Ergonomic wireless mouse with high precision."
    },
    {
      productId: "P002",
      name: "Mechanical Keyboard",
      imageOne: "https://via.placeholder.com/150",
      price: 79.99,
      category: "Electronics",
      description: "RGB mechanical keyboard with blue switches."
    },
    {
      productId: "P003",
      name: "Gaming Headset",
      imageOne: "https://via.placeholder.com/150",
      price: 49.99,
      category: "Accessories",
      description: "Noise-canceling gaming headset with surround sound."
    },
    {
      productId: "P004",
      name: "Smartphone Stand",
      imageOne: "https://via.placeholder.com/150",
      price: 15.99,
      category: "Accessories",
      description: "Adjustable smartphone stand for desk setup."
    },
    {
      productId: "P005",
      name: "Portable Charger",
      imageOne: "https://via.placeholder.com/150",
      price: 29.99,
      category: "Electronics",
      description: "Fast-charging 10,000mAh power bank."
    }
  ]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    let filtered = allProducts.filter(
      (product) =>
        product.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg p-6 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4 sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-semibold text-gray-800">Delete Product</h2>
            <IconButton onClick={onClose} className="text-gray-600 hover:text-black">
              <CloseIcon />
            </IconButton>
          </div>

          {/* Search Input */}
          <Box className="sticky top-16 bg-white z-10 pb-4">
            <TextField
              fullWidth
              label="Search by ID or Name"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          {/* Product Grid */}
          <div className="flex-grow overflow-y-auto p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId}
                    productId={product.productId}
                    productImg={product.imageOne}
                    productName={product.name}
                  />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No matching products found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItem;
