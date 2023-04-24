"use client";
import { useEffect } from "react";
import Thumb from "../Thumb/Thumb";
import Aos from "aos";

const RecommendedProducts = ({ products }) => {
  useEffect(() => {
    Aos.init();
  });
  return (
    <div data-aos="fade-right" className="mx-[5rem] mt-[5.625rem]">
      <h1 className="text-[1.5rem] font-bold">Preporučeno za tebe</h1>
      <div className="mt-[2.5rem]">
        <Thumb slider={true} data={products} />
      </div>
    </div>
  );
};

export default RecommendedProducts;
