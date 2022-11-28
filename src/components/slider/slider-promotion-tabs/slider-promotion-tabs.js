import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ROUTE } from "../../../shared/routing";
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

  const renderTabs = arrayTabsSlider.map((tab) => <Tab key={tab.title} label={tab.title} />);

  const goToCategory = () => {
    router.push({
      pathname: ROUTE.PRODUCTS,
      query: { category: arrayTabsSlider[value].category },
    });
  };

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
        />
      </TabPanel>
    </Box>
  ));

  return (
    <Box component="section" my={12}>
      <Typography variant="h3" component="h2" mb={5}>
        News
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {renderTabs}
          </Tabs>
          <Button
            onClick={goToCategory}
            sx={{
              ml: "auto",
            }}
          >
            See all {arrayTabsSlider[value].title}
          </Button>
        </Box>
        {renderSliders}
      </Box>
    </Box>
  );
};

export default SliderPromotionTabs;
