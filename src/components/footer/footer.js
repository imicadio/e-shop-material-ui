import { Grid, List, ListItemButton, ListItemText } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import BottomFooter from "./bottom/bottomFooter";
import CustomCollapse from "../collapse/collapse";
import Newsletter from "./newsletter/newsletter";

const footerList = [
  {
    title: "Dodatki",
    children: [
      {
        title: "KARTY UPOMINKOWE",
      },
      {
        title: "ZNAJDŹ SKLEP",
      },
      {
        title: "NIKE JOURNAL",
      },
      {
        title: "ZOSTAŃ CZŁONKIEM",
      },
      {
        title: "RABAT DLA STUDENTÓW",
      },
      {
        title: "PRZEŚLIJ OPINIĘ",
      },
    ],
  },
  {
    title: "Uzyskaj pomoc",
    children: [
      {
        title: "Status zamówienia",
      },
      {
        title: "Wysyłka i dostawa",
      },
      {
        title: "Zwroty",
      },
      {
        title: "Opcje płatności",
      },
      {
        title: "Skontaktuj się z nami",
      },
    ],
  },
  {
    title: "O Nike",
    children: [
      {
        title: "Aktualności",
      },
      {
        title: "Praca",
      },
      {
        title: "Inwestorzy",
      },
      {
        title: "Ochrona środowiska",
      },
    ],
  },
  {
    title: "APLIKACJE NIKE",
    children: [
      {
        title: "Nike App",
      },
      {
        title: "Nike Run Club",
      },
      {
        title: "Nike Training Club",
      },
      {
        title: "SNKRS",
      },
    ],
  },
];

const Footer = () => {
  const renderChildren = (item) => {
    return item.children.length > 0
      ? item.children.map((child, id) => (
          <List key={id} component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={child.title} />
            </ListItemButton>
          </List>
        ))
      : null;
  };

  const renderCollapsed = footerList.map((item, id) => (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      key={id}
      sx={{
        width: "100%",
      }}
    >
      <CustomCollapse item={item} breakpoint="lg">
        {renderChildren(item)}
      </CustomCollapse>
    </Grid>
  ));

  return (
    <>
      <Newsletter />
      <Box>
        <Container
          maxWidth="xl"
          sx={{
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            {renderCollapsed}
          </Grid>
        </Container>
      </Box>
      <BottomFooter />
    </>
  );
};

export default Footer;
