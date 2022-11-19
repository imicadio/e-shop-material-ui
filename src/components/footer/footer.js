import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import BottomFooter from "./bottom/bottomFooter";
import FooterCollapse from "./footer-collapse/footer-collapse";
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
      <FooterCollapse item={item} />
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
