import React, { useState } from "react";
import NextLink from "next/link";
import { Box, Typography } from "@mui/material";
import InputNumber from "../../input/input-number";

const SlideStandard = ({ slide }) => {
  const [amount, setAmount] = useState(1);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 1
    }}>
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
          <Typography variant="h6">{slide.title}</Typography>
          <Typography variant="body1">{slide.category}</Typography>
        </a>
      </NextLink>
      <Box
        sx={{
          display: "flex",
          mt: 2
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
