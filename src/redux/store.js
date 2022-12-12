import { configureStore, combineReducers } from "@reduxjs/toolkit";
import listProductsReducer from "./slice/listProductSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";

const rootReducer = combineReducers({
  listProducts: listProductsReducer,
  filter: filterReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
