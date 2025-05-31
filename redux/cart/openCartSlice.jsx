import { createSlice } from "@reduxjs/toolkit";

const openCartSlice = createSlice({
  name: "openCart",
  initialState: {
    isOpen: false, // Initial state for the cart (not open by default)
    numOfItems: 0, // Initial state for the number of items in the cart
    sizeSlider:true,
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true; // Sets isOpen to true when `openCart` is dispatched
    },
    openSizeChart:(state)=>{
      state.sizeSlider=true;
    },
    closeCart: (state) => {
      state.isOpen = false; // Sets isOpen to false when `closeCart` is dispatched
    },
     closeSizeChart:(state)=>{
      state.sizeSlider=false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen; // Toggles the cart's open/close state
    },
     toggleSizeChart:(state)=>{
      state.sizeSlider=!state.sizeSlider;
    },
    updateNumOfItems: (state, action) => {
      state.numOfItems = action.payload; // Update the number of items in the cart
    },
  },
});

export const { openCart, closeCart, toggleCart, updateNumOfItems,toggleSizeChart, openSizeChart, closeSizeChart } = openCartSlice.actions; // Export action creators
export default openCartSlice.reducer; // Export the reducer
