import { Box, Checkbox, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const CartContent = ({ items, totalAmount, totalQuantity }) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Grid item xs={8} p={2}>
        {items.map((item, id) => (
          <Box key={id}>
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
              <Grid item xs={2}>
                <Typography variant="body2" component="p" align="center">
                  {item.cartQuantity}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
          </Box>
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
  );
};

export default CartContent;
