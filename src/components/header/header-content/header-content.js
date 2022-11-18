import React from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTE } from "../../../shared/routing";

const HeaderContent = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const renderMenu = !lgUp ? (
    <IconButton>
      <MenuIcon fontSize="large" />
    </IconButton>
  ) : (
    <>
      <Box>
        <Typography variant="body1" component="p">
          You don't have an account?
        </Typography>
        <Typography variant="body1" align="right" component="p" sx={{ fontWeight: "bold" }}>
          Join to us!{" "}
          <NextLink href={ROUTE.LOGIN} passHref>
            Register
          </NextLink>
        </Typography>
      </Box>
      <Button
        href={ROUTE.LOGIN}
        variant="contained"
        sx={{
          display: "flex",
          marginLeft: "20px",
        }}
      >
        Login
      </Button>
    </>
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} sx={{ py: 3, justifyContent: "space-between" }}>
        <Grid item xs="auto">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1280px-Coca-Cola_logo.svg.png"
            alt="material ui logo"
            style={{
              maxHeight: "50px",
            }}
          />
        </Grid>
        <Grid item md xs={12} order={{ xs: 3, md: 2 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              width: {
                xs: "100%",
                lg: "85%",
              },
              margin: "0 auto",
            }}
          >
            <FormControl fullWidth>
              <OutlinedInput placeholder="Please enter text" />
            </FormControl>
            <Button
              variant="contained"
              sx={{
                md: {
                  display: "block",
                },
              }}
            >
              <Typography
                variant="body1"
                component="p"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                Search
              </Typography>
              <SearchIcon
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item order={{ xs: 2, md: 3 }}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            {renderMenu}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderContent;
