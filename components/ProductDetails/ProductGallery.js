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
        className="h-full  object-cover"
      >
        <Image
          src={src}
          width={2000}
          height={2000}
          className="h-full  object-cover"
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
  console.log(thumbsSwiper);
  const productImage = productGallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
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
          className="cursor-pointer"
        />
      </SwiperSlide>
    );
  });
  return (
    <div className="col-span-2 max-md:col-span-4 max-md:h-[450px] md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className={`${classes.mySwiper2} mySwiper2`}
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
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
        className={`${classes.mySwiper} mySwiper `}
      >
        {" "}
        {thumbImage}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
