import { Box, Container, Typography, Tabs, Tab, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Slider from "../components/slider/slider";
import SliderPromotionTabs from "../components/slider/slider-promotion-tabs/slider-promotion-tabs";
import TabPanel from "../components/tab-panel/tab-panel";
import { useProducts } from "../hooks/useProducts";
import { MainLayout } from "../layout/layout";

const Page = () => {
  const itemsPerView = 4;
  const [isLoading, slides] = useProducts(3);
  const [isLoading1, slides1] = useProducts(30);

  return (
    <>
      <Box
        sx={{
          mt: {
            lg: -5,
          },
        }}
      >
        <Slider slides={slides} type="hero-slider" navigation />
      </Box>
      <Container maxWidth="xl">
        <SliderPromotionTabs
          slider={slides1}
          itemsPerView={{
            slidesPerView: 1,
            breakpoints: {
              600: {
                slidesPerView: 2,
                spaceBetween: 30,
              },

              960: {
                slidesPerView: 3,
                spaceBetween: 30,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }
          }}
        />
      </Container>
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;

export async function getStaticProps() {
  return {
    props: {
      protected: false,
      userTypes: [],
    },
  };
}
