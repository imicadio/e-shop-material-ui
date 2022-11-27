import React, { useContext } from "react";
import NextLink from "next/link";
import { ROUTE } from "../../../shared/routing";
import InputNumber from "../../input/input-number";
import { ProductListingContext } from "./product-listing-view";
import { useBrutto } from "../../../hooks/useBrutto";
import { useTotalPrice } from "../../../hooks/useTotalPrice";
import { Box } from "@mui/system";
import { Divider, Grid, Rating, Typography } from "@mui/material";

const ProductListingResponsive = ({
  id,
  title,
  description,
  price,
  stock,
  discountPercentage,
  rating,
  category,
  thumbnail,
  images,
}) => {
  const link = ROUTE.PRODUCTS_DETAIL + id;

  const [amount] = useContext(ProductListingContext);

  const priceBrutto = useBrutto(price);

  const totalNetto = useTotalPrice(price, amount);
  const totalBrutto = useTotalPrice(priceBrutto, amount);
  return (
    <Box
      sx={{
        maxWidth: "450px",
        p: 2,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          my: 2,
        }}
      >
        <Grid item xs>
          <img src={thumbnail} alt={title} width="100%" />
        </Grid>
        <Grid
          item
          xs
          sx={{
            px: 2,
          }}
        >
          <Typography variant="body2" component="h4" fontWeight="600">
            {category}
          </Typography>
          <Rating name="rating-list" value={rating} readOnly />
          <Typography variant="body2" component="h4" fontWeight="400">
            ${price} netto
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center'
        }}
      >
        <InputNumber stock={stock} />
      </Box>
      <Divider
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default ProductListingResponsive;
