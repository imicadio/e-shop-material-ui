import { Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountPrice } from "../../../helpers/discount";
import {
  PROMO_CODE,
  selectCartDiscount,
  selectCartPromoCode,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../../redux/slice/cartSlice";

const CartSummary = () => {
  const dispatch = useDispatch();
  const discount = useSelector(selectCartDiscount);
  const [promoCode, setPromoCode] = useState(useSelector(selectCartPromoCode));
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  const handlePromoCode = (event) => {
    const inputCode = event.target.value.trim();
    setPromoCode(inputCode);
  };

  const submitPromoCode = () => dispatch(PROMO_CODE(promoCode));

  const renderTotalAmount =
    discount > 0 ? (
      <Typography variant="body1" component="p" fontWeight={600}>
        Total amount: ${discountPrice(totalAmount, discount)}
        <Typography
          variant="body2"
          component="span"
          sx={{
            textDecoration: "line-through",
            ml: 1,
          }}
        >
          ${totalAmount}
        </Typography>
      </Typography>
    ) : (
      <Typography variant="body1" component="p" fontWeight={600}>
        Total amount: ${totalAmount}
      </Typography>
    );

  return (
    <>
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
    </>
  );
};

export default CartSummary;
