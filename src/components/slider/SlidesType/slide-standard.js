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
import { ROUTE } from "../../../shared/routing";
import { useGoToProductDetail } from "../../../hooks/useGoToProductDetail";
import CustomLink from "../../custom-link/custom-link";
import { useGoToCategory } from "../../../hooks/useGoToCategory";
import WishlistAction from "../../actions/wishlist-action";

const SlideStandard = ({ slide }) => {
  const wislistItems = useSelector(selectWishlistItems);
  const auth = useContext(AuthContext);
  const [amount, setAmount] = useState(1);
  const link = useGoToProductDetail(slide.id);
  const goToCategory = useGoToCategory(slide.category);

  const renderWishlistButton = containsId(wislistItems, slide.id) ? (
    <WishlistAction remove product={slide} />
  ) : (
    <WishlistAction add product={slide} />
  );

  const renderTitle = auth.isAuthenticated ? (
    <Grid container>
      <Grid item xs>
        <NextLink href={link} passHref>
          <a>
            <Typography variant="h6">{slide.title}</Typography>
          </a>
        </NextLink>
        <CustomLink href={goToCategory}>
          <Typography variant="body1">{slide.category}</Typography>
        </CustomLink>
      </Grid>

      <Grid item>{renderWishlistButton}</Grid>
    </Grid>
  ) : (
    <>
      <NextLink href={link} passHref>
        <a>
          <Typography variant="h6">{slide.title}</Typography>
        </a>
      </NextLink>
      <CustomLink href={goToCategory}>
        <Typography variant="body1">{slide.category}</Typography>
      </CustomLink>
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
        <NextLink href={link} passHref>
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
