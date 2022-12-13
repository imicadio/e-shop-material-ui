import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

import { FreeMode, Navigation, Thumbs } from "swiper";

const GalleryThumbnail = ({ thumbs }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const renderMainSlide =
    thumbs.length > 0
      ? thumbs.map((img, index) => (
          <SwiperSlide key={index} style={{ textAlign: "center" }}>
            <img src={img} style={{ width: "100%" }} />
          </SwiperSlide>
        ))
      : null;

  const renderThumbSlide =
    thumbs.length > 0
      ? thumbs.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              style={{ width: "100%", maxWidth: "90px", aspectRatio: 1, cursor: "pointer" }}
            />
          </SwiperSlide>
        ))
      : null;

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {renderMainSlide}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {renderThumbSlide}
      </Swiper>
    </>
  );
};

export default GalleryThumbnail;
