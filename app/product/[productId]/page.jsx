"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "@/redux/cart/allProductSlice";
import Navbar from "@/app/components/Navbar";
import RightIconSmartphone from "@/app/components/SmartphoneCartIcon/RightIconSmartphone";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import LeftImgProduct from "../LeftImgProduct";
import RightProductDetails from "../RightProductDetails";

const Page = () => {
  const { productId } = useParams(); // getting the productId
  const dispatch = useDispatch();// store all the products(shop) to react-redux 
  const products = useSelector((state) => state.allProducts?.products || []); // get all the products in the shop

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("/api/products");
          dispatch(setProducts(response.data));
       
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [dispatch, products.length]);

  // Find the product using productId
  const specificProduct = products.find((product) => product?.productId === productId);
  // console.log(specificProduct);

  return (
    <>
      <Navbar />
      <RightIconSmartphone />
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

export default Page;
