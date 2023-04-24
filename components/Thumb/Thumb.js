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
import Wishlist from "../../assets/Icons/heart.png";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
const Thumb = ({ data, slider }) => {
  if (slider) {
    const imageIndexes = data?.map(() => useState(0)); // Create array of image index states
    const products = data?.map((product, index) => {
      const [imageIndex, setImageIndex] = imageIndexes[index]; // Access the correct state for the current product
      const addToWishlist = useGlobalAddToWishList();
      return (
        <SwiperSlide key={product?.basic_data?.id} className="">
          <div className=" w-full  item">
            <div className="h-[575px] item relative">
              {product?.image[0] && (
                <Image
                  src={convertHttpToHttps(product?.image[imageIndex])}
                  alt={product?.basic_data?.name}
                  width={22000}
                  height={22000}
                  className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                />
              )}
            </div>
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
            <div className="absolute rounded-lg py-5 left-3 bottom-[5rem] w-[95%] mx-auto bg-white chevrons">
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
            <div className="mt-[0.813rem] flex items-center justify-between relative z-[50]">
              <h1 className="text-[0.813rem]">{product?.basic_data?.name}</h1>
              <div
                onClick={() => {
                  addToWishlist(product?.basic_data?.id_product);
                  toast.success(
                    `Proizvod ${product?.basic_data?.name} je dodat u listu želja!`,
                    {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                }}
                className="hover:bg-red-500 rounded-full p-1 favorites"
              >
                <Image
                  src={Wishlist}
                  alt="wishlist"
                  width={15}
                  height={15}
                  className="favorite"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-[10px]">
              <h1 className="bg-[#f8ce5d] text-[0.813rem] font-bold text-center min-w-[5.938rem] max-w-[6rem]">
                {currencyFormat(product?.price?.price?.original)}
              </h1>
              <span className="text-[0.813rem] font-semibold text-[#818181]">
                {" "}
                {currencyFormat(product?.price?.price?.original)}
              </span>
            </div>
          </div>
        </SwiperSlide>
      );
    });

    return (
      <>
        <ToastContainer />
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
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
