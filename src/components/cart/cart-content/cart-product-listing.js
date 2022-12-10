import React from "react";
import { Box, Checkbox, Divider, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, DECREASE_CART } from "../../../redux/slice/cartSlice";

const CartProductListing = ({ item, handleOpenAlert }) => {
  const dispatch = useDispatch();
  const handleIncrease = () => {
    dispatch(ADD_TO_CART({ product: item }));
  };
  const handleDecrease = () => {
    if (item.cartQuantity === 1) {
      return handleOpenAlert(null, item);
    }
    dispatch(DECREASE_CART({ product: item }));
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid item xs={1}>
          <Checkbox />
        </Grid>
        <Grid p={2} item xs={2}>
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </Grid>
        <Grid p={2} item xs={4}>
          <Typography variant="body1" component="p">
            {item.title}
          </Typography>
        </Grid>
        <Grid p={2} item xs={2}>
          <Typography variant="body2" component="p" align="center">
            ${item.price}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton aria-label="decrease" onClick={handleDecrease}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body2" component="p" align="center">
            {item.cartQuantity}
          </Typography>
          <IconButton aria-label="increase" onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1} textAlign="right">
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={(e) => handleOpenAlert(e, item)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default CartProductListing;
