import React, { useContext, useEffect, useRef, useState } from "react";
import Router from "next/router";
import NextLink from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  IconButton,
  Badge,
  Paper,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTE } from "../../../shared/routing";
import { AuthContext } from "../../../contexts/auth-context";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Search from "../../search/search";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/listProductSlice";
import CartHeader from "../../cart/cart-header";

const HeaderContent = ({ open, setActiveMenu }) => {
  const modalBackground = useRef(null);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const refCart = useRef(null);

  const auth = useContext(AuthContext);

  // SEARCH

  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const products = useSelector(selectProducts);

  const handleClear = () => {
    setWordEntered("");
    setFilteredData([]);
  };

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // END SEARCH

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

      // Redirect to homepage
      Router.push(ROUTE.HOME).catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBtnCart = () => {
    if (isOpenCart) return modalBackground.current.closeModal();
    setIsOpenCart(true);
  };

  const renderOpenCart = isOpenCart ? (
    <CartHeader isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} ref={modalBackground} />
  ) : null;

  const renderSearchResults =
    filteredData.length > 0 ? (
      <Paper
        elevations={12}
        sx={{
          p: 3,
          position: "absolute",
          zIndex: (theme) => theme.zIndex.appBar + 101,
          maxHeight: "30vh",
          overflowY: "auto",
          width: "100%",
        }}
      >
        {filteredData.map((product) => (
          <Box key={product.id}>
            <NextLink href={ROUTE.PRODUCTS_DETAIL + product.id} passHref>
              <a>
                <Grid
                  container
                  sx={{
                    my: 2,
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    sx={{
                      height: 1,
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                      }}
                    />
                  </Grid>
                  <Grid item xs={7} mx={2}>
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.title} {product.description}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <Typography variant="body1" component="p" fontWeight="bold">
                      ${product.price}
                    </Typography>
                  </Grid>
                </Grid>
              </a>
            </NextLink>
            <Divider />
          </Box>
        ))}
      </Paper>
    ) : null;

  const renderMenu = () => {
    if (!lgUp) {
      return (
        <IconButton //function that is called when the drawer should close
          onClick={toggleDrawer(true)}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      );
    } else if (auth.isAuthenticated)
      return (
        <>
          <Box
            sx={{
              position: "relative",

              // '&:hover > *:last-child': {
              //   width: '100vw',
              // }
            }}
          >
            <Box
              sx={{
                position: "relative",
                background: isOpenCart ? "white" : null,
                display: "flex",
                height: "100%",
                alignItems: "center",
                p: 0,
                px: 2,
                zIndex: 4,
                cursor: "pointer",
              }}
              onClick={handleBtnCart}
            >
              <Typography variant="body1" component="p" fontWeight={600}>
                Cart
              </Typography>
              <IconButton
                aria-label="shopping-cart"
                sx={{
                  height: "100%",
                }}
              >
                <Badge badgeContent={4} color="primary">
                  <ShoppingBasketIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Box>
            <Box
              sx={{
                position: "absolute",
                zIndex: 3,
                right: 0,
                overflow: "hidden",
                // transition: 'width 2s, background-color 2s, transform 2s',
              }}
            >
              {renderOpenCart}
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              marginLeft: "20px",
            }}
            onClick={logoutUser}
          >
            Logout
          </Button>
        </>
      );
    else {
      return (
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
    }
  };

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
            <Search wordEntered={wordEntered} handleSearch={handleSearch} handleClear={handleClear}>
              {renderSearchResults}
            </Search>
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
            {renderMenu()}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderContent;
