"use client";

import Aos from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const RecommendedCategories = ({ categories }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div
      data-aos="fade-left"
      className="grid grid-cols-1 lg:grid-cols-2 gap-[1.25rem] mt-[1.25rem] mx-[1.25rem]"
    >
      {categories?.map((category, index) => {
        return (
          <div className="col-span-1" key={index}>
            <div className="relative h-[630px]">
              <Image
                src={category?.images?.image}
                alt={category.slug}
                width={2400}
                height={2400}
                className="object-cover h-full bg-fixed"
              />
              <div className="absolute h-full  top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <div>
                  <h1 className="max-lg:text-[3.5rem] text-[5rem] 2xl:text-[8.5rem] font-light text-white uppercase">
                    {category?.basic_data?.name}
                  </h1>
                  <p className="self-end text-right text-white text-[1.5rem] -mt-8">
                    {category?.basic_data?.short_description}
                  </p>
                </div>
              </div>
              <Link href={`/kategorije/${category?.slug_path}`}>
                <div className="absolute transition-all duration-500 h-full w-full top-0 right-0 bottom-0 left-0 bg-transparent hover:bg-black hover:bg-opacity-30 z-[50]"></div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCategories;
