import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import { ROUTE } from "../../../shared/routing";
import InputNumber from "../../input/input-number";
import { AuthContext } from "../../../contexts/auth-context";
import { ProductListingContext } from "./product-listing-view";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { REMOVE_FROM_WISHLIST } from "../../../redux/slice/wishlistSlice";

const ProductListingNormal = (props) => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const {
    id,
    title,
    brand,
    description,
    price,
    stock,
    discountPercentage,
    rating,
    category,
    thumbnail,
    images,
  } = props;
  const link = ROUTE.PRODUCTS_DETAIL + id;
  const [amount, setAmount] = useContext(ProductListingContext);
  ``;
  const goToPage = () => {
    router.push({ pathname: link });
  };

  const renderWishlist =
    router.pathname === ROUTE.WISHLIST ? (
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <IconButton type="button" aria-label="remove from wishlist" onClick={handleRemoveWishlist}>
          <FavoriteIcon />
        </IconButton>
      </Grid>
    ) : null;

  const dispatch = useDispatch();
  const handleRemoveWishlist = (e) => dispatch(REMOVE_FROM_WISHLIST({ product: props }));

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
        amount={amount}
        setAmount={setAmount}
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
      <Button variant="outlined" onClick={goToPage}>
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

        {renderWishlist}
      </Grid>
      <Divider />
    </>
  );
};

export default ProductListingNormal;
