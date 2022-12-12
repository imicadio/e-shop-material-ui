import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems:
    typeof window !== "undefined" && localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  filterWishlistItems: '',
  wishlistTotalQuantity: 0,
  search: "",
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

    FILTER_BY_SEARCH_WISHLIST(state, action) {
      const { search, products } = action.payload;
      state.search = search.toUpperCase();      

      state.filterWishlistItems = products.filter((product) => {
        const isArrayValid = [];

        if (state.search.length > 0) {
          if (product.title.toUpperCase().includes(state.search)) {
            isArrayValid.push(true);
          } else {
            isArrayValid.push(false);
          }
        }

        return isArrayValid.every((element) => element === true);
      });

      
    },
  },
});

export const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_CLEAR, FILTER_BY_SEARCH_WISHLIST } =
  wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;
export const selectSearchWishlist = (state) => state.wishlist.search;
export const selectSearchFilterWishlist = (state) => state.wishlist.filterWishlistItems;

export default wishlistSlice.reducer;
