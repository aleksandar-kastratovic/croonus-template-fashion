"use client";
import Aos from "aos";
import Image from "next/image";
import { useEffect } from "react";
const IndexBanner = ({ banner }) => {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div
      data-aos="fade-up-left"
      className="block mx-[20px] mt-[7.5rem] transition-all duration-500 "
    >
      <div className="relative h-[630px]">
        <Image
          src={banner[0]?.image}
          alt={banner[0]?.title}
          width={1920}
          height={1080}
          className="object-cover"
        />
        <div className="absolute flex flex-col items-center justify-center gap-10 top-[50%] text-center left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {banner[0]?.title && (
            <h1 className="text-white text-[8.875rem] font-light uppercase leading-[4.625rem]">
              {banner[0]?.title}
            </h1>
          )}
          {banner[0]?.text && (
            <h1 className="text-white text-[1.438rem] font-light self-end leading-[2.625rem]">
              {banner[0]?.text}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;
