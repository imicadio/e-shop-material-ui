import { TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function CartSummaryCell({ item }) {
  return (
    <>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {item.id}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{item.brand}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>{item.cartQuantity}</TableCell>
    </>
  );
}

export default CartSummaryCell;
