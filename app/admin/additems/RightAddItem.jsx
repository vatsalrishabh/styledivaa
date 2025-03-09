"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState } from 'react';
import AddItems from './AddItems';
import DeleteItem from './DeleteItem';
import UpdateItem from './UpdateItem';
import { Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

const RightAddItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [isModalThreeOpen, setIsModalThreeOpen] = useState(false);

  const breadcrumbLinks = [
    { label: "Admin", href: "/admin" },
  ];

  const productData = {
    productId: "12345",
    productName: "Sample Product",
    description: "This is a sample product description.",
    rating: 4.5,
    price: 1200,
    discountPercentage: 10,
    images: ["https://via.placeholder.com/150"],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 12, XXL: 9 },
    color: "Red",
    print: "Graphic",
    neck: "Round",
    pocket: "Yes",
    sleeves: "Full",
    shape: "Regular",
    length: "Medium",
    material: "Cotton",
    sizeFit: "True to size",
  };

  return (
    <div className="lg:w-[83%] w-full absolute right-0 min-h-screen bg-gray-100 p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <AdminBreadCrumbs links={breadcrumbLinks} name="Manage Products" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </Button>

        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalTwoOpen(true)}
        >
          Delete Item
        </Button>

        <Button
          variant="contained"
          color="warning"
          startIcon={<Edit />}
          className="w-60 h-16 text-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsModalThreeOpen(true)}
        >
          Update Item
        </Button>
      </div>

      {/* Product Preview Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-4 transform transition-all hover:scale-105">
          <img
            src={productData.images[0]}
            alt="Product"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-3">{productData.productName}</h3>
          <p className="text-gray-500 text-sm">{productData.description}</p>
          <p className="text-gray-900 font-bold mt-2">₹{productData.price}</p>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <AddItems
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productData={productData}
        />
      )}

      {isModalTwoOpen && (
        <DeleteItem
          isOpen={isModalTwoOpen}
          onClose={() => setIsModalTwoOpen(false)}
          productData={productData}
        />
      )}

      {isModalThreeOpen && (
        <UpdateItem
          isOpen={isModalThreeOpen}
          onClose={() => setIsModalThreeOpen(false)}
          productData={productData}
        />
      )}
    </div>
  );
};

export default RightAddItem;
