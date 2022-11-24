import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import React, { useContext } from "react";
import NextLink from "next/link";
import { ROUTE } from "../../../shared/routing";
import InputNumber from "../../input/input-number";
import { ProductListingContext } from "./product-listing-view";
import { useBrutto } from '../../../hooks/useBrutto';
import { useTotalPrice } from "../../../hooks/useTotalPrice";

const ProductListingBig = ({
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
    <>
      <Grid
        container
        spacing={4}
        sx={{
          my: 2,
          ml: 0,
          width: 1,
          div: {
            "&:nth-of-type(-n+2)": {
              paddingTop: "0 !important",
            },

            "&:first-of-type": {
              // paddingLeft: 0,
            },
          },
          border: 1,
          borderColor: "primary.gray",
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
          xs={5}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1
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

          <Rating name="rating-list" value={rating} readOnly />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "primary.lightGray",
            borderLeft: 1,
            borderColor: "primary.gray",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" component="p">
                ${totalNetto}
              </Typography>
              <Typography variant="body2" component="p">
                netto
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="p">
                ${price}
              </Typography>
              <Typography variant="body2" component="p">
                netto pc.
              </Typography>
            </Box>
          </Box>

          <Grid
            container
            spacing={5}
            sx={{
              my: 3,
            }}
          >
            <Grid item xs>
              <Typography variant="body1" component="p" fontWeight={600}>
                ${totalBrutto}
              </Typography>
              <Typography variant="body2" component="p">
                brutto
              </Typography>
            </Grid>
            <Grid
              item
              xs
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="body1" component="p" fontWeight={600}>
                {stock}
              </Typography>
              <Typography variant="body2" component="p">
                stock
              </Typography>
            </Grid>
            <Grid
              item
              xs
              sx={{
                pt: "0 !important",
                textAlign: "right",
              }}
            >
              <Typography variant="body1" component="p" fontWeight={600}>
                ${price}
              </Typography>
              <Typography variant="body2" component="p">
                brutto pc.
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <InputNumber stock={stock} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductListingBig;
