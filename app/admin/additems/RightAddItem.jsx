"use client"
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React, { useState } from 'react';
import AddItems from './AddItems';

const RightAddItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    <div className='lg:w-[83%] w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
      <div className="p-4">
        <AdminBreadCrumbs links={breadcrumbLinks} name="Add Items" />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Item
        </button>
      </div>

      {isModalOpen && (
        <AddItems
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productData={productData}
        />
      )}
    </div>
  );
};

export default RightAddItem;
