'use client';
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import allProductReducer from "./cart/allProductSlice"; // ✅ Correct path
import openCartReducer from "./cart/openCartSlice";
import colorImgReducer from "./cart/colorImgSlice"

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        openCart:openCartReducer,
        allProducts: allProductReducer,
        colorImg: colorImgReducer, 
    },
});
