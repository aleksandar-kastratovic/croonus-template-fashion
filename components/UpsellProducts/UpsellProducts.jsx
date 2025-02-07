"use client";
import { Fragment, Suspense, useState } from "react";
import { useGlobalAddToWishList } from "@/api/globals";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Thumb } from "../Thumb/Thumb";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { list } from "@/api/api";

const UpsellProducts = ({
  upsellProducts = [],
  loading,
  text = "Preporučujemo",
  api,
  path,
}) => {
  const { data } = useSuspenseQuery({
    queryKey: [path, api, text],
    queryFn: async () => {
      return await list(`${api}/${path}`).then((res) => res?.payload?.items);
    },
  });

  return (
    <>
      {data?.length > 0 && (
        <div className="max-sm:w-[95%] mt-[6rem] max-sm:mx-auto md:mx-[3rem] max-sm:mt-[3rem]  overflow-visible">
          <div className="flex justify-between w-full items-center">
            <h5 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
              {text}
            </h5>
          </div>
          <div className="max-sm:mt-[1rem] mt-[2.5rem]">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              fadeEffect={{ crossFade: true }}
              loop={data.length < 4 ? false : true}
              className="mySwiper3 w-full select-none"
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                  loop: data.length < 4 ? false : true,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                  loop: data.length < 5 ? false : true,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                  loop: data.length < 8 ? false : true,
                },
                1680: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                  loop: data.length < 10 ? false : true,
                },
              }}
            >
              {data?.map(({ id }) => {
                return (
                  <Fragment key={id}>
                    <Suspense
                      fallback={
                        <SwiperSlide className="aspect-2/3 h-full w-full animate-pulse bg-slate-300" />
                      }
                    >
                      <SwiperSlide key={id} className="hoveredColor">
                        <Thumb id={id} slug={id} />
                      </SwiperSlide>
                    </Suspense>
                  </Fragment>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default UpsellProducts;
