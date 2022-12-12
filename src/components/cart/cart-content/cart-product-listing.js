import React from "react";
import { Box, Checkbox, Divider, Grid, IconButton, Typography, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, DECREASE_CART, selectCartDiscount } from "../../../redux/slice/cartSlice";
import { discountPrice } from "../../../helpers/discount";

const CartProductListing = ({ item, selected, handleClick, handleOpenAlert }) => {
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

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isItemSelected = isSelected(item.id);
  const discount = useSelector(selectCartDiscount);

  const renderPrice =
    discount > 0 ? (
      <Typography variant="body1" component="p" fontWeight={600} sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        ${discountPrice(item.price, discount)}
        <Typography
          variant="body2"
          component="span"
          sx={{
            textDecoration: "line-through",
          }}
        >
          ${item.price}
        </Typography>
      </Typography>
    ) : (
      <Typography variant="body1" component="p" fontWeight={600}>
        Total amount: ${item.price}
      </Typography>
    );

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
          <Checkbox checked={isItemSelected} onClick={(event) => handleClick(event, item.id)} />
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
          {renderPrice}
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
