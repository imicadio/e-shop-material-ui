import { Box, Checkbox, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const CartHeaderTop = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Grid item xs={8} p={2}>
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
              <Typography variant="body1" component="p" fontWeight={600}>
                Image
              </Typography>
            </Grid>
            <Grid p={2} item xs={4}>
              <Typography variant="body1" component="p" fontWeight={600}>
                Title
              </Typography>
            </Grid>
            <Grid p={2} item xs={2}>
              <Typography variant="body1" component="p" fontWeight={600}>
                Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" component="p" fontWeight={600}>
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body1" component="p" fontWeight={600}>
                Action
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        p={2}
      ></Grid>
    </Grid>
  );
};

export default CartHeaderTop;
