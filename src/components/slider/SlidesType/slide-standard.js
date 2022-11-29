import React, { useContext, useState } from "react";
import NextLink from "next/link";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import InputNumber from "../../input/input-number";
import { AuthContext } from "../../../contexts/auth-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SlideStandard = ({ slide }) => {
  const auth = useContext(AuthContext);
  const [amount, setAmount] = useState(1);

  const renderTitle = auth.isAuthenticated ? (
    <Grid container>
      <Grid item xs>
        <Typography variant="h6">{slide.title}</Typography>
        <Typography variant="body1">{slide.category}</Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="add to wishlist">
          <FavoriteBorderIcon />
        </IconButton>
      </Grid>
    </Grid>
  ) : (
    <>
      <Typography variant="h6">{slide.title}</Typography>
      <Typography variant="body1">{slide.category}</Typography>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 1,
      }}
    >
      <NextLink href="/" passHref>
        <a>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <img
              src={slide.thumbnail}
              alt={slide.id}
              width="100%"
              style={{ aspectRatio: 1, objectFit: "cover" }}
            />
          </Box>
          {renderTitle}
        </a>
      </NextLink>
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
    </Box>
  );
};

export default SlideStandard;
