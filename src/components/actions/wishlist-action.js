import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../redux/slice/wishlistSlice";

const WishlistAction = ({ add, remove, product }) => {
  const dispatch = useDispatch();
  const handleAddWishlist = (e) => dispatch(ADD_TO_WISHLIST({ product: product }));
  const handleRemoveWishlist = (e) => dispatch(REMOVE_FROM_WISHLIST({ product: product }));

  if (add) {
    return (
      <IconButton type="button" aria-label="add to wishlist" onClick={handleAddWishlist}>
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
    );
  }

  if (remove) {
    return (
      <IconButton type="button" aria-label="remove from wishlist" onClick={handleRemoveWishlist}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
    );
  }
};

export default WishlistAction;
