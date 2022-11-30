import React, { createContext, useState } from "react";
import ProductListingBig from "./product-listing-big";
import ProductListingNormal from "./product-listing-normal";
import ProductListingResponsive from "./product-listing-responsive";

export const ProductListingContext = createContext(null);

const ProductListingView = ({ type, product }) => {
  const [amount, setAmount] = useState(1);
  const value = [amount, setAmount];
  let renderView;

  if (type == "normal") {
    renderView = <ProductListingNormal {...product} />;
  } else if (type == "large") {
    renderView = <ProductListingBig {...product} />;
  } else if (type == "responsive") {
    renderView = <ProductListingResponsive {...product} />;
  } else {
    renderView = null;
  }

  return (
    <ProductListingContext.Provider value={value}>{renderView}</ProductListingContext.Provider>
  );
};

export default ProductListingView;
