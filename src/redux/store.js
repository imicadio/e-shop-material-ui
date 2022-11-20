import { configureStore, combineReducers } from "@reduxjs/toolkit";
import listProductsReducer from "./slice/listProductSlice";
import filterReducer from "./slice/filterSlice";

const rootReducer = combineReducers({
  listProducts: listProductsReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
