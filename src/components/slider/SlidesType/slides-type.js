import React from "react";
import HeroSlider from "./hero-slide";
import SlideStandard from "./slide-standard";

const SlidesType = ({ type, slide }) => {
  switch (type) {
    case "hero-slider":
      return <HeroSlider {...slide} />;
    case "standard":
      return <SlideStandard slide={slide} />;
    default:
      return null;
  }
};

export default SlidesType;
