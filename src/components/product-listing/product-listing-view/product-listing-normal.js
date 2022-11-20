import { Grid, Typography } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ROUTE } from "../../../shared/routing";
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ProductListingNormal = ({
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

  console.log(link);
  return (
    <Grid
      container
      spacing={4}
      sx={{
        my: 2,
        div: {
          paddingTop: "0 !important",
        },
      }}
    >
      <Grid item xs={2}>
        <img src={thumbnail} alt={title} width="100%" />
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <NextLink href={link} passHref>
          <a>
            <Typography variant="body1" component="h5" fontWeight="600" color="black">
              {title}
            </Typography>
            <Typography variant="body2" component="p" color="primary.middleBlack">
              {description}
            </Typography>
          </a>
        </NextLink>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h5" component="p">
          ${price}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" component="p">
          {stock}
          <TagFacesIcon />
        </Typography>

      </Grid>
      <Grid item></Grid>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ProductListingNormal;
