import React from "react";
import {
    Box,
    Container,
    Typography,
  } from "@mui/material";

const HeaderTopBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.lightGray",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="body1"
          component="p"
          align="center"
          sx={{ textTransform: "uppercase", fontWeight: "bold" }}
        >
          DISCOUNT 20% CODE: MAJKEL20
        </Typography>
      </Container>
    </Box>
  );
};

export default HeaderTopBar;
