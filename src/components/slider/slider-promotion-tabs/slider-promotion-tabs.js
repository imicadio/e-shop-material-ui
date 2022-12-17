import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGoToCategory } from "../../../hooks/useGoToCategory";
import { ROUTE } from "../../../shared/routing";
import CustomLink from "../../custom-link/custom-link";
import TabPanel from "../../tab-panel/tab-panel";
import Slider from "../slider";

const SliderPromotionTabs = ({ slider, itemsPerView }) => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const arrayTabsSlider = [
    {
      title: "Laptops",
      items: slider.slice(0, 12),
      type: "standard",
      navigation: true,
      loop: true,
      perView: itemsPerView,
      category: "laptops",
    },
    {
      title: "Smartphones",
      items: slider.slice(15, 27),
      type: "standard",
      navigation: true,
      loop: true,
      perView: itemsPerView,
      category: "smartphones",
    },
    {
      title: "Skincare",
      items: slider.slice(20, 30),
      type: "standard",
      navigation: true,
      loop: true,
      perView: itemsPerView,
      category: "skincare",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = arrayTabsSlider.map((tab) => (
    <Tab
      key={tab.title}
      label={tab.title}
      sx={{
        maxWidth: "unset",
        border: {
          xs: "1px solid #d8d8d8",
          sm: 0,
        },
        my: {
          xs: 1,
          sm: 0,
        },
        "&.Mui-selected": {
          border: { xs: 1, sm: 0 },
          borderBlockColor: "primary.main",
        },
      }}
    />
  ));

  const goToCategory = useGoToCategory(arrayTabsSlider[value].category);

  const renderSliders = arrayTabsSlider.map((slider, id) => (
    <Box
      key={id}
      sx={{
        ".swiper-slide": {
          height: "auto",
        },
      }}
    >
      <TabPanel value={value} index={id}>
        <Slider
          slides={slider.items}
          type={slider.type}
          navigation={slider.navigation}
          loop={slider.loop}
          perView={slider.perView}
          pagination={true}
        />
      </TabPanel>
    </Box>
  ));

  return (
    <Box component="section" my={12}>
      <Typography variant="h3" component="h2" mb={5}>
        News
      </Typography>
      <Box
        sx={{
          width: "100%",
          ".swiper-pagination": {
            position: "relative",
            marginTop: 5,
            ".swiper-pagination-bullet": {
              width: "12px",
              height: "12px",
              borderRadius: 0,
              "&-active": {
                background: "#1f1a17",
                opacity: "0.7",
              },
            },
          },
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              ".MuiTabs-indicator": {
                display: {
                  xs: "none",
                  sm: "block",
                },
              },
              ".MuiTabs-flexContainer": {
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              },
            }}
          >
            {renderTabs}
          </Tabs>
          <Box
            sx={{
              ml: {
                xs: "auto",
                sm: "auto",
              },
              mr: {
                xs: "auto",
                sm: "0",
              },
              py: 2,
            }}
          >
            <CustomLink href={goToCategory}>
              <Typography
                color="textPrimary"
                variant="body1"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  color: "#65748B",
                  "&:hover": {
                    color: "#b7181d",
                  },
                }}
              >
                See all {arrayTabsSlider[value].title}
              </Typography>
            </CustomLink>
          </Box>
        </Box>
        {renderSliders}
      </Box>
    </Box>
  );
};

export default SliderPromotionTabs;
