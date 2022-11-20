import { configureStore, combineReducers } from "@reduxjs/toolkit";
import listProductsReducer from "./slice/listProductSlice";

const rootReducer = combineReducers({
  listProducts: listProductsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
