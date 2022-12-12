import {
  Box,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountPrice } from "../../../helpers/discount";
import {
  PROMO_CODE,
  REMOVE_FROM_CART,
  selectCartDiscount,
  selectCartPromoCode,
} from "../../../redux/slice/cartSlice";
import AlertDialog from "../../dialog/dialog";
import CartProductListing from "./cart-product-listing";

const CartContent = ({ items, selected, totalAmount, totalQuantity, handleClick }) => {
  const dispatch = useDispatch();
  const discount = useSelector(selectCartDiscount);
  const [promoCode, setPromoCode] = useState(useSelector(selectCartPromoCode));
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

  const handlePromoCode = (event) => {
    const inputCode = event.target.value.trim();
    setPromoCode(inputCode);
  };

  const submitPromoCode = () => dispatch(PROMO_CODE(promoCode));

  const handleConfirm = (isConfirmed) => {
    if (isConfirmed) {
      dispatch(REMOVE_FROM_CART({ product: openAlert.item }));
    }
    setOpenAlert(() => ({
      isAlert: !openAlert.isAlert,
      item: null,
    }));
  };

  const renderTotalAmount =
    discount > 0 ? (
      <Typography variant="body1" component="p" fontWeight={600}>
        Total amount:
        <Typography
          variant="body2"
          component="span"
          sx={{
            textDecoration: "line-through",
            mr: 1,
          }}
        >
          ${totalAmount}
        </Typography>
        ${discountPrice(totalAmount, discount)}
      </Typography>
    ) : (
      <Typography variant="body1" component="p" fontWeight={600}>
        Total amount: ${totalAmount}
      </Typography>
    );

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
          {renderTotalAmount}
          <Typography variant="body1" component="p" fontWeight={600} mt={1}>
            Total quantity: {totalQuantity}
          </Typography>
          <Divider
            sx={{
              mt: 2,
            }}
          />
          <TextField
            fullWidth
            label="Promo code"
            name="promoCode"
            onChange={handlePromoCode}
            type="text"
            value={promoCode}
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <Button variant="contained" sx={{ width: 1 }} onClick={submitPromoCode}>
            Apply
          </Button>
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
