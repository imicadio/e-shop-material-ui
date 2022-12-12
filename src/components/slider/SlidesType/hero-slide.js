import { useMediaQuery } from "@mui/material";
import React from "react";

const HeroSlide = ({ thumbnail, id }) => {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"), {
    defaultMatches: true,
    noSsr: false,
  });

  const imgStyle = smDown
    ? { width: "100%", maxHeight: "30vh", objectFit: "contain" }
    : { width: "100%", maxHeight: "40vh", objectFit: "contain" };

  return <img src={thumbnail} alt={id} style={imgStyle} />;
};

export default HeroSlide;
