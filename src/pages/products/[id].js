import { Box, Container, Grid, IconButton, Rating, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import InputNumber from "../../components/input/input-number";
import GalleryThumbnail from "../../components/slider/gallery-thumbnail";
import { MainLayout } from "../../layout/layout";
import { ROUTE } from "../../shared/routing";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  selectWishlistItems,
} from "../../redux/slice/wishlistSlice";
import { AuthContext } from "../../contexts/auth-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { containsId } from "../../helpers/containsId";
import Breadcrumb from "../../components/breadcrumbs/breadcrumb";
import CustomLink from "../../components/custom-link/custom-link";
import { useGoToCategory } from "../../hooks/useGoToCategory";
import WishlistAction from "../../components/actions/wishlist-action";

const Page = ({ product }) => {
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
  } = product;

  const [amount, setAmount] = useState(1);
  const wislistItems = useSelector(selectWishlistItems);
  const auth = useContext(AuthContext);
  const goToCategory = useGoToCategory(category);

  const renderWishlistButton = containsId(wislistItems, id) ? (
    <WishlistAction remove product={product} />
  ) : (
    <WishlistAction add product={product} />
  );

  const renderComponentAddToCart = auth.isAuthenticated ? (
    <Grid
      item
      xs
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <InputNumber
        product={product}
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
  ) : null;

  return (
    <Container maxWidth="xl">
      <Breadcrumb />
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={6}>
          <GalleryThumbnail thumbs={images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {title}{" "}
            <Typography variant="h1" component="span" align="right">
              ${price}
            </Typography>
          </Typography>
          <CustomLink href={goToCategory}>
            <Typography variant="h5" component="h3" mb={1}>
              {category}
            </Typography>
          </CustomLink>
          <Rating name="rating-list" value={rating} readOnly />
          <Typography variant="body1" component="p" mt={2}>
            {description}
          </Typography>

          <Box
            sx={{
              my: 3,
              display: "flex",
              flexDirection: "row",
            }}
          >
            {renderComponentAddToCart}
            {renderWishlistButton}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + ROUTE.PRODUCTS + ".json");
  const products = await res.json();

  const paths = products.map((product, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + ROUTE.PRODUCTS_DETAIL + params.id}.json`
  );
  const product = await res.json();

  return { props: { product: product, protected: false, userTypes: [] } };
}

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
