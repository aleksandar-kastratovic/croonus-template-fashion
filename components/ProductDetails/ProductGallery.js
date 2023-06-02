"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Pagination, Thumbs } from "swiper";
import Image from "next/image";
import classes from "./styles.module.css";

const ProductGallery = ({ productGallery }) => {
  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="h-full w-full object-cover"
      >
        <Image
          src={src}
          width={2000}
          height={2000}
          priority={true}
          className="h-full w-full object-cover"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={src.alt}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const productImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index} className="w-full">
        <ImageMagnifier src={image?.image} width={2000} height={2000} />
      </SwiperSlide>
    );
  });
  const thumbImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <Image
          src={image?.image}
          width={2000}
          height={2000}
          priority={true}
          className="cursor-pointer max-md:hidden"
        />
      </SwiperSlide>
    );
  });
  return (
    <div className="col-span-2 max-md:col-span-4 max-md:h-[450px] md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination]}
        className={`${classes.mySwiper2} mySwiper2`}
        breakpoints={{
          320: {
            direction: "vertical",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            },
          },
          768: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              enabled: false,
            },
          },
        }}
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={0}
        autoplay={true}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 0,
            thumbs: {
              enabled: false,
            },
            modules: [],
          },
          768: {
            direction: "vertical",
            slidesPerView: 4,
            enabled: true,
            modules: [FreeMode, Thumbs],
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        className={`${classes.mySwiper} mySwiper max-md:hidden`}
      >
        {" "}
        {thumbImage}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
