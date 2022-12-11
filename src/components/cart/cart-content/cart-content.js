import { Box, Checkbox, Divider, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../../../redux/slice/cartSlice";
import AlertDialog from "../../dialog/dialog";
import CartProductListing from "./cart-product-listing";

const CartContent = ({ items, selected, totalAmount, totalQuantity, handleClick }) => {
  const dispatch = useDispatch();
  const [openAlert, setOpenAlert] = useState({
    isAlert: false,
    item: null,
  });

  const handleOpenAlert = (event, item) => {
    console.log("open alert: ", openAlert.isAlert);
    setOpenAlert(() => ({
      isAlert: !openAlert.isAlert,
      item: item,
    }));
  };

  const handleConfirm = (isConfirmed) => {
    if (isConfirmed) {
      dispatch(REMOVE_FROM_CART({ product: openAlert.item }));
    }
    setOpenAlert(() => ({
      isAlert: !openAlert.isAlert,
      item: null,
    }));
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={8}
          p={2}
          sx={{
            overflowY: "auto",
            height: "100%",
          }}
        >
          {items.map((item, id) => (
            <CartProductListing
              key={id}
              item={item}
              handleClick={handleClick}
              selected={selected}
              handleOpenAlert={handleOpenAlert}
            />
          ))}
        </Grid>
        <Grid
          item
          xs={4}
          p={2}
          sx={{
            backgroundColor: "primary.lightGray",
          }}
        >
          <Typography variant="body1" component="p" fontWeight={600}>
            Total amount: ${totalAmount}
          </Typography>
          <Typography variant="body1" component="p" fontWeight={600} mt={1}>
            Total quantity: {totalQuantity}
          </Typography>
        </Grid>
      </Grid>
      <AlertDialog
        openAlert={openAlert.isAlert}
        // handleOpenAlert={handleOpenAlert}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default CartContent;
