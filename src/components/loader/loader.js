import React from "react";
import { Box, Container, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box
    component="main"
    sx={{
      alignItems: "center",
      display: "flex",
      flexGrow: 1,
      minHeight: "100%",
    }}
  >
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Container>
  </Box>
);
