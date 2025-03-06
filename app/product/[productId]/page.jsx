"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Correct import
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import RightIconSmartphone from "@/app/components/SmartphoneCartIcon/RightIconSmartphone";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import LeftImgProduct from "../LeftImgProduct";
import RightProductDetails from "../RightProductDetails";

const page = () => {
  const { productId } = useParams(); // ✅ Fetch product ID from URL
  const [specificProduct, setSpecificProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`); // ✅ Pass ID dynamically
        console.log(response);
        // setSpecificProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (productId) {
      fetchProduct(); // ✅ Only fetch when ID is available
    }
  }, [productId]);

  return (
    <>
      <Navbar />
      <RightIconSmartphone /> {/* Static cart icon */}
      <div className="w-full">
        <div className="px-4 pt-4">
          <BreadCrumbs one="Home" oneLink="/" two="Product" twoLink="/product" />
        </div>
        <div className="p-4 md:p-10">
          <div className="left-right-container grid lg:grid-cols-2 gap-4">
            <div className="left order-2 lg:order-1">
              <LeftImgProduct product={specificProduct} />
            </div>
            <div className="right order-1 lg:order-2">
              <RightProductDetails product={specificProduct} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
