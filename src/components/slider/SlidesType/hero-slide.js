import React from "react";

const HeroSlide = ({ thumbnail, id }) => {

  return <img src={thumbnail} alt={id} style={{width: '100%', maxHeight: '60vh', objectFit: 'contain'}} />;
};

export default HeroSlide;
