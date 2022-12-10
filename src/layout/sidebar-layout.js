import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "../components/dashboard-navbar";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { Container } from "@mui/system";
import { Sidebar } from "./sidebar";

export const SidebarLayout = (props) => {
  const { children, sidebar } = props;  

  return (
    <Container maxWidth="xl">
      <Grid container spacing={5}>
        <Grid
          item
          sx={{
            position: {
              xs: "absolute",
              lg: "relative",
              zIndex: 2,
            },
          }}
        >
          {sidebar}
          {/* <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} /> */}
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Grid>
        {/* <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} /> */}
      </Grid>
    </Container>
  );
};
