import { TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NextLink from "next/link";
import { ROUTE } from "../../shared/routing";

function CartSummaryCell({ item }) {
  const link = ROUTE.PRODUCTS_DETAIL + new String(item.id - 1);

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
      <TableCell>
        <NextLink href={link}>
          <a
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: "50px", height: "50px", marginRight: "8px" }}
            />
            {item.brand}
          </a>
        </NextLink>
      </TableCell>
      <TableCell>
        <Typography color="textPrimary" variant="body1">
          {item.category}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          color="textPrimary"
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
        >
          ${item.price}
        </Typography>
      </TableCell>
      <TableCell>{item.cartQuantity}</TableCell>
    </>
  );
}

export default CartSummaryCell;
