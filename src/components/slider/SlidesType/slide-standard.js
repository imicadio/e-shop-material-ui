import React, { useContext, useState } from "react";
import NextLink from "next/link";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import InputNumber from "../../input/input-number";
import { AuthContext } from "../../../contexts/auth-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  selectWishlistItems,
} from "../../../redux/slice/wishlistSlice";
import { containsId } from "../../../helpers/containsId";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SlideStandard = ({ slide }) => {
  const dispatch = useDispatch();
  const wislistItems = useSelector(selectWishlistItems);
  const auth = useContext(AuthContext);
  const [amount, setAmount] = useState(1);

  const handleWishlist = (e) => dispatch(ADD_TO_WISHLIST({ product: slide }));

  const handleRemoveWishlist = (e) => dispatch(REMOVE_FROM_WISHLIST({ product: slide }));

  const renderWishlistButton = containsId(wislistItems, slide.id) ? (
    <IconButton type="button" aria-label="remove from wishlist" onClick={handleRemoveWishlist}>
      <FavoriteIcon />
    </IconButton>
  ) : (
    <IconButton type="button" aria-label="add to wishlist" onClick={handleWishlist}>
      <FavoriteBorderIcon />
    </IconButton>
  );

  const renderTitle = auth.isAuthenticated ? (
    <Grid container>
      <Grid item xs>
        <NextLink href="/" passHref>
          <a>
            <Typography variant="h6">{slide.title}</Typography>
            <Typography variant="body1">{slide.category}</Typography>
          </a>
        </NextLink>
      </Grid>

      <Grid item>{renderWishlistButton}</Grid>
    </Grid>
  ) : (
    <>
      <Typography variant="h6">{slide.title}</Typography>
      <Typography variant="body1">{slide.category}</Typography>
    </>
  );

  const renderAddToCart = auth.isAuthenticated ? (
    <Box
      sx={{
        display: "flex",
        mt: 2,
      }}
    >
      <InputNumber
        product={slide}
        stock={slide.stock}
        amount={amount}
        setAmount={setAmount}
        display={{
          display: {
            xs: "none",
            xl: "block",
          },
        }}
      />
    </Box>
  ) : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 1,
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <NextLink href="/" passHref>
          <a>
            <img
              src={slide.thumbnail}
              alt={slide.id}
              width="100%"
              style={{ aspectRatio: 1, objectFit: "cover" }}
            />
          </a>
        </NextLink>

        {renderTitle}
      </Box>
      {renderAddToCart}
    </Box>
  );
};

export default SlideStandard;
