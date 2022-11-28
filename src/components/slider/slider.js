import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation, Grid } from "swiper";

import "swiper/swiper-bundle.css";
import { useMediaQuery } from "@mui/material";
import SlidesType from "./SlidesType/slides-type";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Slider = ({
  slides,
  pagination,
  navigation,
  type,
  loop,
  autoplay,
  customOptions,
  perView,
}) => {
  const { isMobile } = useMediaQuery((theme) => theme.breakpoints.down("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  console.log('slider per view: ', perView)

  const swiperRef = React.useRef(null);

  const swiperParams = {
    pagination: pagination ? true : false,
    navigation: navigation ? (isMobile ? false : true) : false,
    loop: loop ? true : false,
    autoplay: autoplay
      ? {
          delay: 5000,
        }
      : false,
    ...customOptions,
    ...perView,
    spaceBetween: 30,
  };

  const renderSlides =
    slides.length > 0
      ? slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlidesType type={type} slide={slide} />
          </SwiperSlide>
        ))
      : null;

  const renderNavigation = !isMobile && navigation && (
    <React.Fragment>
      <div onClick={() => swiperRef.current.swiper.slidePrev()}></div>
      <div onClick={() => swiperRef.current.swiper.slideNext()}></div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Swiper {...swiperParams} ref={swiperRef} style={{ width: "100%" }}>
        {renderSlides}
      </Swiper>
      {renderNavigation}
    </React.Fragment>
  );
};

export default Slider;
