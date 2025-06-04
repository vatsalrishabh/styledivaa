'use client';
 import { createSlice } from "@reduxjs/toolkit";

const colorImgSlice = createSlice({
  name: 'colorImg',
  initialState: {
    color: '',
    img: ''
  },
  reducers: {
    setColorImg: (state, action) => {
      state.color = action.payload.color;
      state.img = action.payload.image;
    },
    resetColorImg: (state) => {
      state.color = '';
      state.img = '';
    }
  }
});

export const { setColorImg, resetColorImg} = colorImgSlice.actions;
export default colorImgSlice.reducer;