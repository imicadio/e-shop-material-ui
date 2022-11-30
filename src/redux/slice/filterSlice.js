import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  brands: [],
  selectedBrands: [],
  categories: [],
  selectedCategories: [],
  minPrice: 0,
  maxPrice: 0,
  priceMinMax: 0,
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTERS_STORE: (state, action) => {
      state.brands = action.payload.brands;
      state.categories = action.payload.categories;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.priceMinMax = [action.payload.minPrice, action.payload.maxPrice];
    },

    FILTER_BY_SEARCH(state, action) {
      const { search } = action.payload;

      state.search = search.toUpperCase();
    },

    FILTER_BY_CATEGORIES: (state, action) => {
      const { products, filters, price } = action.payload;

      let tmpProducts = [];

      const hasFilter = Object.values(filters).some((x) => x.length > 0);
      if (hasFilter) {
        // get filters keys
        const keys = Object.keys(filters).filter((x) => filters[x].length);
        tmpProducts = products.filter((product) => {
          // helper array fot valid element
          const isArrayValid = [];

          if (state.search.length > 0) {
            if (product.title.toUpperCase().includes(state.search)) {
              isArrayValid.push(true);
            } else {
              isArrayValid.push(false);
            }
          }

          for (const key of keys) {
            const title = product[key].toUpperCase();
            const productPrice = product.price;
            filters[key].includes(title) &&
            price[0] <= productPrice &&
            productPrice <= price[1]
              ? isArrayValid.push(true)
              : isArrayValid.push(false);
          }

          return isArrayValid.every((element) => element === true);
        });
        state.filteredProducts = tmpProducts;
      } else {
        state.filteredProducts = products.filter((product) => {
          const isArrayValid = [];

          price[0] <= product.price && product.price <= price[1]
            ? isArrayValid.push(true)
            : isArrayValid.push(false);

          if (state.search.length > 0) {
            if (product.title.toUpperCase().includes(state.search)) {
              isArrayValid.push(true);
            } else {
              isArrayValid.push(false);
            }
          }

          return isArrayValid.every((element) => element === true);
        });
      }

      state.selectedBrands = filters.brand;
      state.selectedCategories = filters.category;
      state.priceMinMax = price;
    },
  },
});

export const { FILTER_BY_SEARCH, FILTER_BY_CATEGORIES, FILTERS_STORE } =
  filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const selectBrands = (state) => state.filter.brands;
export const selectCategories = (state) => state.filter.categories;
export const selectMinPrice = (state) => state.filter.minPrice;
export const selectMaxPrice = (state) => state.filter.maxPrice;
export const selectSearch = (state) => state.filter.search;

export default filterSlice.reducer;
