import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import NextLink from "next/link";
import { ROUTE } from "../../../shared/routing";
import InputNumber from "../../input/input-number";
import { AuthContext } from "../../../contexts/auth-context";

const ProductListingNormal = (props) => {
  const auth = useContext(AuthContext);
  const link = ROUTE.PRODUCTS_DETAIL + id;
  const {
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
  } = props;

  const renderComponentAddToCart = auth.isAuthenticated ? (
    <Grid
      item
      xs
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputNumber
        product={props}
        stock={stock}
        display={{
          display: {
            xs: "none",
            xl: "block",
          },
        }}
      />
    </Grid>
  ) : (
    <Grid
      item
      xs
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button href={link} variant="outlined" sx={{}}>
        Show product
      </Button>
    </Grid>
  );

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          my: 2,
          div: {
            paddingTop: "0 !important",
          },
          maxHeight: "100px",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={2}
          sx={{
            maxHeight: "inherit",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img src={thumbnail} alt={title} height="auto" width="100%" />
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
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="p">
            ${price}
          </Typography>
          <Typography variant="body2" component="p">
            ${price}
          </Typography>
          <Typography variant="body2" component="p">
            netto
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" component="p">
            {stock}
          </Typography>
          <Typography variant="body2" component="p">
            Stock
          </Typography>
        </Grid>

        {renderComponentAddToCart}
      </Grid>
      <Divider />
    </>
  );
};

export default ProductListingNormal;
