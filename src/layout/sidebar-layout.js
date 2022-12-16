import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "../components/dashboard-navbar";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { Container } from "@mui/system";
import { Sidebar } from "./sidebar";

export const SidebarLayout = (props) => {
  const { children, sidebar, isMobile } = props;

  return (
    <Container
      maxWidth="xl"
      sx={
        isMobile
          ? {
              paddingLeft: '0 !important',
              paddingRight: '0 !imporant'
            }
          : {}
      }
    >
      <Grid
        container
        spacing={5}
        sx={
          isMobile
            ? {
                flexDirection: {
                  xs: "column-reverse",
                  lg: "row",
                },
              }
            : {}
        }
      >
        <Grid
          item
          sx={{
            position: {
              xs: isMobile ? "relative" : "absolute",
              lg: "relative",
              zIndex: 2,
              order: isMobile ? 1 : '',
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
            width: '100%',
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
