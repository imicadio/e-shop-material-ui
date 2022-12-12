import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems:
    typeof window !== "undefined" && localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  wishlistTotalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    ADD_TO_WISHLIST: (state, action) => {
      const { product } = action.payload;

      const tmpProduct = { ...product };

      state.wishlistItems.push(tmpProduct);
      state.wishlistTotalQuantity += 1;
      toast.success(`${product.title} product added to wishlist`, { position: "top-left" });

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },

    REMOVE_FROM_WISHLIST: (state, action) => {
      const { product } = action.payload;

      const newWishlisttItem = state.wishlistItems.filter((item) => item.id !== product.id);

      state.wishlistItems = newWishlisttItem;
      toast.success(`${product.title} removed from wishlist`, {
        position: "top-left",
      });

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
  },
});

export const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_CLEAR } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;

export default wishlistSlice.reducer;
