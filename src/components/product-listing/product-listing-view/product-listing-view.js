import React from "react";

function ProductListingView() {
  switch (type) {
    case "box-standard":
      return <BoxStandard slide={slide} />;
    case "box-small":
      return <BoxSmall slide={slide} />;
    default:
      return null;
  }
}

export default ProductListingView;
