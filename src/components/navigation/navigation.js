import React from "react";
import NextLink from "next/link";
import { Box, Container, Typography } from "@mui/material";
import { ROUTE } from "../../shared/routing";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";

const listNavigation = [
  {
    name: "Home",
    link: ROUTE.HOME,
    icon: <HomeIcon />,
  },
  {
    name: "Products",
    link: ROUTE.PRODUCTS,
  },
];

const Navigation = () => {
  const router = useRouter();

  const renderNavigation = listNavigation.map((item) => (
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
  ));

  return (
    <Box
      sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: "primary.gray",
        display: {
          xs: "none",
          lg: "block",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex" }}>
        {renderNavigation}
      </Container>
    </Box>
  );
};

export default Navigation;
