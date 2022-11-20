import React from "react";
import ProductListingBig from "./product-listing-big";
import ProductListingNormal from "./product-listing-normal";
import ProductListingResponsive from "./product-listing-responsive";

function ProductListingView({ type, product }) {
  switch (type) {
    case "normal":
      return <ProductListingNormal{...product} />;
    case "large":
      return <ProductListingBig{...product} />;
    case "responsive":
      return <ProductListingResponsive{...product} />;
    default:
      return null;
  }
}

export default ProductListingView;
