import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import CartContent from "./cart-content/cart-content";
import CartHeaderTop from "./cart-header-top";

const CartHeader = forwardRef(({ isOpenCart, setIsOpenCart }, ref) => {
  const dispatch = useDispatch();
  const cartOverlay = useRef(null);
  const cartWrapper = useRef(null);
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  const closeModal = () => {

    console.log('ref: ', ref.current)

    cartOverlay.current.style.animationName = "overlayHide";
    cartWrapper.current.style.animationName = "slideIn";

    const delay = setTimeout(() => {
      setIsOpenCart(false);
      clearTimeout(delay);
    }, 1000);

    delay;
  };

  useImperativeHandle(ref, () => ({
    closeModal,
  }));

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          background: "black",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          animationName: "overlayShow",
          animationDuration: "1s",
          animationFillMode: "forwards",
          "@keyframes overlayShow": {
            "0%": {
              opacity: 0,
            },
            "100%": {
              opacity: 0.5,
            },
          },
          "@keyframes overlayHide": {
            "0%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 0,
            },
          },
        }}
        ref={cartOverlay}
        onClick={closeModal}
      ></Box>
      <Box
        ref={cartWrapper}
        sx={{
          position: "relative",
          width: "960px",
          height: "450px",
          background: "white",
          zIndex: 4,
          borderRadius: 0,
          animationName: "slideOut",
          animationDuration: "0.9s",
          animationFillMode: "forwards",
          "@keyframes slideOut": {
            "0%": {
              transform: "translateY(-110%)",
            },
            "100%": {
              transform: "translateY(0)",
            },
          },
          "@keyframes slideIn": {
            "0%": {
              transform: "translateY(0)",
            },
            "100%": {
              transform: "translateY(-110%)",
            },
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.gray",
            height: "70px",
          }}
        >
          <CartHeaderTop />
        </Box>
        <CartContent items={cartItems} totalQuantity={totalQuantity} totalAmount={totalAmount} />
        <Grid
          container
          sx={{
            backgroundColor: "primary.gray",
            height: "70px",
          }}
        >
          <Grid item xs={8} p={2}></Grid>
          <Grid item xs={4} p={2}>
            <Button variant="contained" sx={{ width: 1 }}>
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});

export default CartHeader;
