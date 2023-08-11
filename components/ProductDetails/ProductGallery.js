"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FreeMode, Pagination, Thumbs } from "swiper";
import Image from "next/image";
import classes from "./styles.module.css";

const ProductGallery = ({ productGallery, color, loading, setLoading }) => {
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
          fill
          sizes={
            "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw, 20vw"
          }
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
          alt={`Pazari Shop`}
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
          alt={`Pazari Shop`}
          width={2000}
          height={2000}
          priority={true}
          className="cursor-pointer max-md:hidden"
        />
      </SwiperSlide>
    );
  });

  const [newImage, setNewImage] = useState(0);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (color) {
      const newImage = productGallery?.findIndex((item) =>
        item?.variant_key?.includes(color)
      );
      setNewImage(newImage);
      swiper?.slideTo(newImage);
    }
  }, [color]);

  useEffect(() => {
    if (productGallery?.length) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [productGallery]);
  return (
    <div className="col-span-2 max-md:col-span-4 max-md:h-[500px] md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[878px]">
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={true}
        modules={[FreeMode, Thumbs, Pagination]}
        initialSlide={color ? newImage : 0}
        onSwiper={(swiper) => setSwiper(swiper)}
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
              enabled: false,
            },
          },
        }}
      >
        {loading ? (
          <SwiperSlide>
            <div className="h-full w-full bg-gray-200 animate-pulse"></div>
          </SwiperSlide>
        ) : (
          <> {productImage}</>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={0}
        loop={true}
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
            slidesPerView: 4.25,
            enabled: true,
            loop: true,
            modules: [FreeMode, Thumbs],
          },
        }}
        freeMode={true}
        className={`${classes.mySwiper} mySwiper max-md:hidden !relative`}
      >
        {" "}
        {thumbImage}
        <div
          className={`absolute ${
            productGallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } bottom-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slideNext();
          }}
        >
          <i
            className={`fas fa-chevron-down`}
            onClick={() => {
              swiper?.slideNext();
            }}
          ></i>
        </div>
        <div
          className={`absolute ${
            productGallery?.length > swiper?.params?.slidesPerView
              ? `block`
              : `hidden`
          } top-0 left-0 w-full py-1 right-0 flex items-center justify-center z-50 cursor-pointer bg-white/80`}
          onClick={() => {
            swiper?.slidePrev();
          }}
        >
          <i
            className={`fas fa-chevron-up`}
            onClick={() => {
              swiper?.slidePrev();
            }}
          ></i>
        </div>
      </Swiper>
    </div>
  );
};

export default ProductGallery;
