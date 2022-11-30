import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],  
};

const listProductSlice = createSlice({
  name: "listProducts",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload.products;    
    },
  },
});

export const { STORE_PRODUCTS } = listProductSlice.actions;

export const selectProducts = (state) => state.listProducts.products;

export default listProductSlice.reducer;
