import React, { useContext } from "react";
import NextLink from "next/link";
import { ROUTE } from "../../../shared/routing";
import InputNumber from "../../input/input-number";
import { ProductListingContext } from "./product-listing-view";
import { useBrutto } from "../../../hooks/useBrutto";
import { useTotalPrice } from "../../../hooks/useTotalPrice";
import { Box } from "@mui/system";
import { Button, Divider, Grid, IconButton, Rating, Typography } from "@mui/material";
import { AuthContext } from "../../../contexts/auth-context";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_WISHLIST } from "../../../redux/slice/wishlistSlice";
import { useRouter } from "next/router";

const ProductListingResponsive = (props) => {
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
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const link = ROUTE.PRODUCTS_DETAIL + id;
  const [amount, setAmount] = useContext(ProductListingContext);
  const isWishlist = router.pathname === ROUTE.WISHLIST;

  const handleRemoveWishlist = (e) => dispatch(REMOVE_FROM_WISHLIST({ product: props }));

  const renderWishlist = isWishlist ? (
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

  const renderComponentAddToCart = auth.isAuthenticated ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        justifyContent: isWishlist ? "space-between" : "flex-end",
      }}
    >
      {renderWishlist}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputNumber product={props} stock={stock} amount={amount} setAmount={setAmount} />
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button href={link} variant="outlined" sx={{}}>
        Show product
      </Button>
    </Box>
  );

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
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
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

      {renderComponentAddToCart}

      <Divider
        sx={{
          mt: 4,
        }}
      />
    </Box>
  );
};

export default ProductListingResponsive;
