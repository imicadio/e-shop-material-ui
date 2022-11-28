import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ProductListingContext } from "../product-listing/product-listing-view/product-listing-view";
import { inputBetweenNumber } from "../../hooks/numbers";
import { ADD_TO_CART } from "../../redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const InputNumber = ({ stock, display, product, amount, setAmount }) => {
  const dispatch = useDispatch();  

  const increment = () => amount < stock && setAmount(amount + 1);
  const decrement = () => amount > 1 && setAmount(amount - 1);
  const handleAmount = (e) => {
    setAmount(inputBetweenNumber(e.target.value, stock));
  };

  const addToCart = () => {
    dispatch(ADD_TO_CART({ product, amount }));
  };

  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          alignItems: "cetner",
          flexDirection: "row",
          border: 1,
          borderColor: "primary.gray",
        }}
      >
        <OutlinedInput
          sx={{
            maxWidth: "70px",
            fieldset: {
              border: 0,
            },
          }}
          value={amount}
          onChange={handleAmount}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "primary.gray",
            borderLeft: 1,
            borderColor: "primary.gray",
          }}
        >
          <IconButton
            aria-label="increment"
            sx={{
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "primary.lightGray",
              },
            }}
            onClick={increment}
          >
            <AddIcon
              sx={{
                fontSize: "12px",
              }}
            />
          </IconButton>
          <Divider />
          <IconButton
            aria-label="decrement"
            sx={{
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "primary.lightGray",
              },
            }}
            onClick={decrement}
          >
            <RemoveIcon
              sx={{
                fontSize: "12px",
              }}
            />
          </IconButton>
        </Box>
      </FormControl>

      <Button
        variant="contained"
        sx={{
          py: 2,
          ml: 1,
        }}
        onClick={addToCart}
      >
        <AddShoppingCartIcon />
        <Box
          component="span"
          sx={{
            ml: 1,
            ...display,
          }}
        >
          Add to cart
        </Box>
      </Button>
    </>
  );
};

export default InputNumber;
