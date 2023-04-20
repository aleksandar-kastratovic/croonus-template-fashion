"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Chevron from "../../assets/Icons/right-chevron.png";
const Thumb = ({ data, slider }) => {
  if (slider) {
    const imageIndexes = data?.map(() => useState(0)); // Create array of image index states
    const products = data?.map((product, index) => {
      const [imageIndex, setImageIndex] = imageIndexes[index]; // Access the correct state for the current product

      return (
        <SwiperSlide key={product?.basic_data?.id} className="item">
          <div className="h-[575px] w-full relative item">
            {product?.image[0] && (
              <Image
                src={convertHttpToHttps(product?.image[imageIndex])}
                alt={product?.basic_data?.name}
                width={22000}
                height={22000}
                className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
              />
            )}
            <div className="absolute  px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
              <div>
                <Image
                  className="cursor-pointer rotate-180"
                  src={Chevron}
                  alt="chevron"
                  width={15}
                  height={15}
                  onClick={() => {
                    if (imageIndex === 0) {
                      setImageIndex(product?.image.length - 1);
                    } else {
                      setImageIndex(imageIndex - 1);
                    }
                  }}
                />
              </div>
              <div>
                <Image
                  className="cursor-pointer rotate-0"
                  src={Chevron}
                  alt="chevron"
                  width={15}
                  height={15}
                  onClick={() => {
                    if (imageIndex === product?.image.length - 1) {
                      setImageIndex(0);
                    } else {
                      setImageIndex(imageIndex + 1);
                    }
                  }}
                />
              </div>
            </div>
            <div className="absolute rounded-lg py-5 left-3 bottom-3 w-[95%] mx-auto bg-white chevrons">
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-[1.05rem] font-semibold text-center">
                  Izaberi veličinu
                </h1>
                <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">
                  {product?.variant_options?.length > 0 ? (
                    <>
                      {product?.variant_options?.slice(0, 1).map((item2) => {
                        return (
                          <>
                            {item2?.values.map((item3) => {
                              return (
                                <>
                                  <div className="rounded-full cursor-pointer p-2 w-12 border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">
                                    {item3?.name}
                                  </div>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });

    return (
      <>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  }
};

export default Thumb;
