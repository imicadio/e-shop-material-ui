import { Badge, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartTotalQuantity } from "../../../redux/slice/cartSlice";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const CartBadge = () => {
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const renderBadge =
    cartTotalQuantity > 0 ? (
      <IconButton
        aria-label="shopping-cart"
        sx={{
          height: "100%",
        }}
      >
        <Badge badgeContent={cartTotalQuantity} color="primary">
          <ShoppingBasketIcon fontSize="large" />
        </Badge>
      </IconButton>
    ) : (
      <IconButton
        aria-label="shopping-cart"
        sx={{
          height: "100%",
        }}
      >
        <ShoppingBasketIcon fontSize="large" />
      </IconButton>
    );

  return <>{renderBadge}</>;
};

export default CartBadge;
