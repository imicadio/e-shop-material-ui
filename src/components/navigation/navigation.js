import React, { useContext } from "react";
import NextLink from "next/link";
import {
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ROUTE } from "../../shared/routing";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import Router from "next/router";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import { AuthContext } from "../../contexts/auth-context";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const listNavigation = [
  {
    name: "Home",
    link: ROUTE.HOME,
    icon: <HomeIcon sx={{ color: "primary.main" }} />,
    guard: [],
  },
  {
    name: "Products",
    link: ROUTE.PRODUCTS,
    icon: <AutoAwesomeMotionIcon sx={{ color: "primary.main" }} />,
    guard: [],
  },
  {
    name: "Wishlist",
    link: ROUTE.WISHLIST,
    icon: <AutoAwesomeMotionIcon sx={{ color: "primary.main" }} />,
    guard: ["admin", "user"],
  },
];

const Navigation = ({ open, setActiveMenu }) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    //changes the function state according to the value of open
    setActiveMenu(open);
  };

  const logoutUser = () => {
    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      // await auth.signOut();

      // Update Auth Context state
      auth.logout();

      // Redirect to sign-in page
      Router.push(ROUTE.HOME).catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  const renderNavigation = lgUp ? (
    listNavigation.map((item) => {
      if (item.guard.length !== 0) {
        return auth.isAuthenticated && item.guard.includes(auth.user.role) ? (
          <Typography
            variant="body1"
            component="p"
            align="left"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              backgroundColor: router.pathname == item.link ? "primary.lightGray" : "",
              p: 1,
            }}
            key={item.name}
            className={router.pathname == item.link ? "navigation-item active" : "navigation-item"}
          >
            <NextLink href={item.link} passHref>
              {item.name}
            </NextLink>
          </Typography>
        ) : null;
      }

      return (
        <Typography
          variant="body1"
          component="p"
          align="left"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            backgroundColor: router.pathname == item.link ? "primary.lightGray" : "",
            p: 1,
          }}
          key={item.name}
          className={router.pathname == item.link ? "navigation-item active" : "navigation-item"}
        >
          <NextLink href={item.link} passHref>
            {item.name}
          </NextLink>
        </Typography>
      );
    })
  ) : (
    // RESPONSIVE
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{
          mr: 2,
          display: {
            xs: "none",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* The outside of the drawer */}
      <Drawer
        //from which side the drawer slides in
        anchor="left"
        //if open is true --> drawer is shown
        open={open}
        //function that is called when the drawer should close
        onClose={toggleDrawer(false)}
      >
        {/* The inside of the drawer */}
        <Box
          sx={{
            p: 2,
            height: 1,
            width: "100%",
          }}
        >
          {/* 
        when clicking the icon it calls the function toggleDrawer 
        and closes the drawer by setting the variable open to false
        */}
          <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>

          {auth.isAuthenticated ? (
            <>
              <Divider sx={{ mb: 2 }} />
              <ListItemButton>
                <ListItemIcon>
                  <Badge badgeContent={4} color="primary">
                    <ShoppingBasketIcon fontSize="large" />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Shopping cart" />
              </ListItemButton>
              <Divider sx={{ my: 2 }} />{" "}
            </>
          ) : null}

          <Box sx={{ mb: 2 }}>
            {listNavigation.map((item) => (
              <ListItemButton key={item.name} href={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            {auth.isAuthenticated ? (
              <Button variant="contained" sx={{ m: 1 }} onClick={logoutUser}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="contained" sx={{ m: 1, width: 0.5 }}>
                  Register
                </Button>
                <Button variant="outlined" sx={{ m: 1, width: 0.5 }}>
                  Login
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Toolbar>
  );

  return (
    <Box
      sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: {
          xs: "transparent",
          lg: "primary.gray",
        },
        position: {
          xs: "absolute",
          lg: "relative",
        },
        top: {
          xs: 0,
          lg: "unset",
        },
        mb: 5,
      }}
      className="navigation-menu"
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        {renderNavigation}
      </Container>
    </Box>
  );
};

export default Navigation;
