import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import ProductListingView from "./product-listing-view/product-listing-view";

const ProductListing = ({ products, currentPage, itemsPerPage, viewList }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const returnProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const listType = viewList ? "large" : "normal";

  const renderProductsList =
    returnProducts.length > 0 && lgUp
      ? returnProducts.map((product, id) => (
          <ProductListingView key={id} product={product} type={listType} />
        ))
      : returnProducts.map((product, id) => (
          <ProductListingView key={id} product={product} type="responsive" />
        ));

  return <Box>{renderProductsList}</Box>;
};

export default ProductListing;
