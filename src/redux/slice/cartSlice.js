import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: (typeof window !== "undefined") && localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const { product, amount } = action.payload;

      const productIndex = state.cartItems.findIndex((item) => item.id === product.id);

      if (productIndex >= 0) {
        amount
          ? (state.cartItems[productIndex].cartQuantity += amount)
          : (state.cartItems[productIndex].cartQuantity += 1);
        toast.info(`${product.title} product increased by ${amount ? amount : 1}`, {
          position: "top-left",
        });
      } else {
        const tmpProduct = amount
          ? { ...product, cartQuantity: amount }
          : { ...product, cartQuantity: 1 };
        state.cartItems.push(tmpProduct);
        amount ? (state.cartTotalQuantity += amount) : (state.cartTotalQuantity += 1);
        toast.success(`${product.title} product added to cart`, { position: "top-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART: (state, action) => {
      const { product, amount } = action.payload;

      const productIndex = state.cartItems.findIndex((item) => item.id === product.id);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${product.title} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter((item) => item.id !== product.id);
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const { product } = action.payload;

      const newCartItem = state.cartItems.filter((item) => item.id !== product.id);

      state.cartItems = newCartItem;
      toast.success(`${product.title} removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CALCULATE_SUBTOTAL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },

    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
