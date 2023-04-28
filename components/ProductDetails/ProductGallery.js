"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper";
import Image from "next/image";
import classes from "./styles.module.css";
const ProductGallery = ({ productGallery }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <Image src={image?.image} width={2000} height={2000} />
      </SwiperSlide>
    );
  });
  return (
    <div className="col-span-2 max-md:col-span-4 max-md:h-[450px] md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={`${classes.mySwiper2} `}
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 4,
          },
          768: {
            direction: "vertical",
            slidesPerView: 4,
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className={classes.mySwiper}
      >
        {" "}
        {productImage}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
