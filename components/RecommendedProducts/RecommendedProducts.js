"use client";
import { useEffect } from "react";
import Thumb from "../Thumb/Thumb";
import Aos from "aos";
import Link from "next/link";

const RecommendedProducts = ({ products }) => {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div
      data-aos="fade-right"
      className="max-sm:w-[95%] max-sm:mx-auto md:mx-[5rem] max-sm:mt-[3rem] md:mt-[5.625rem] overflow-visible"
    >
      <div className='flex justify-between w-full items-center'>
        <h1 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
          Izdvajamo za vas
        </h1>
        <Link href='/' className='text-2xl underline text-[#171717] block'>
          Pogledajte sve proizvod
        </Link>
      </div>
      <div className="max-sm:mt-[1rem] mt-[2.5rem]">
        <Thumb slider={true} data={products} />
      </div>
    </div>
  );
};

export default RecommendedProducts;
