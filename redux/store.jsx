'use client';
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import openCartReducer from "./cart/openCartSlice";

export const store = configureStore({
    reducer:{
        cart:cartReducer,
        openCart:openCartReducer,
    },
});
