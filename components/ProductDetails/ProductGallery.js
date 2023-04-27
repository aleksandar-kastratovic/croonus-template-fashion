"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper";
import Image from "next/image";
import "./styles.css";
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
    <div className="col-span-2 flex flex-row-reverse gap-5 max-h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        direction={"vertical"}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {" "}
        {productImage}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
