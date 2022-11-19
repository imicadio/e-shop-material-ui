import React from "react";
import { Grid, IconButton, Typography, Box, Container } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BottomFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.gray",
        mt: 3
      }}
    >
      <Container maxWidth="xl">
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box
            gridColumn="span 10"
            xs={10}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" component="h6">
              Copyright © 2022 All rights reserved{" "}
              <a
                rel="noopener noreferrer"
                href="https://github.com/imicadio/e-shop-material-ui"
                target="_blank"
              >
                Michał Jeszko
              </a>
            </Typography>
          </Box>
          <Box gridColumn="span 2">
            <IconButton
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: 0,
                p: 2,
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BottomFooter;
