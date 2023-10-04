"use client";
import { useEffect, useState } from "react";

import Aos from "aos";
import Link from "next/link";
import Thumb from "@/components/Thumb/Thumb";
import { usePathname } from "next/navigation";

const RecommendedProducts = ({ recommendedProducts, action4 }) => {
  const [products, setProducts] = useState(recommendedProducts);
  const uniqueNames = [];
  const uniqueIds = [];
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    Aos.init();
  });
  return (
    <div
      data-aos="fade-right"
      className="max-sm:w-[95%] max-sm:mx-auto md:mx-5 lg:mx-[3rem] max-sm:mt-[3rem] md:mt-[5.625rem] overflow-visible"
    >
      <div className="max-lg:col-span-1 lg:col-span-4 2xl:col-span-4 4xl:col-span-5">
        <div className="relative flex flex-col justify-between max-lg:gap-3 lg:flex-row lg:items-center">
          <h1 className={`text-[25px] font-bold`}>{action4}</h1>
          {!pathname.includes("korpa") && (<><div className="flex flex-row max-md:hidden items-center gap-6">
            {recommendedProducts?.map((category) => {
              const uniqueCategories = category?.categories?.filter(
                  (item, index, arr) =>
                      arr.findIndex((el) => el.name === item.name) === index
              );

              if (uniqueNames.includes(uniqueCategories[0]?.name)) {
                return null;
              } else {
                uniqueNames.push(uniqueCategories[0]?.name);
                return (
                    <div className="" key={category.id}>
                      <button
                          className={
                            selectedCategory === uniqueCategories[0]?.id
                                ? `font-normal w-fit relative active-button  text-lg activeCategory text-black`
                                : `font-normal w-fit relative  text-lg text-black`
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            let newProducts = [...recommendedProducts];
                            newProducts = recommendedProducts?.filter((item) => {
                              return (
                                  item?.categories[0]?.id === uniqueCategories[0]?.id
                              );
                            });
                            setProducts(newProducts);
                            setSelectedCategory(uniqueCategories[0]?.id);
                          }}
                      >
                        {uniqueCategories[0]?.name}
                      </button>
                    </div>
                );
              }
            })}
          </div>
            <div className="md:hidden">
              <select
                  onChange={(e) => {
                    let newProducts = [...recommendedProducts];
                    newProducts = recommendedProducts?.filter((item) => {
                      return item?.categories[0]?.id === Number(e.target.value);
                    });
                    setProducts(newProducts);
                  }}
                  className="rounded-md border-2 border-[#f7f7f7] focus:border-[#f7f7f7] focus:outline-0 focus:ring-0 text-black w-full max-md:text-[0.9rem]"
              >
                {recommendedProducts?.map((category) => {
                  const uniqueCategories = category?.categories?.filter(
                      (item, index, arr) =>
                          arr.findIndex((el) => el.name === item.name) === index
                  );

                  // check if category ID has already been rendered
                  if (uniqueIds.includes(uniqueCategories[0]?.id)) {
                    return null;
                  } else {
                    uniqueIds.push(uniqueCategories[0]?.id); // add ID to array
                    return (
                        <option
                            key={uniqueCategories[0]?.id}
                            value={Number(uniqueCategories[0]?.id)}
                            className={`max-md:text-[0.9rem]`}
                        >
                          {uniqueCategories[0]?.name}
                        </option>
                    );
                  }
                })}
              </select>
            </div><div className="flex items-center gap-3">
              <Link
                  className="max-md:text-[0.9rem] text-lg underline text-[#171717] block"
                  href={`/sekcija/preporuceno`}
              >
                Pogledajte sve proizvode
              </Link>
            </div></>)}

        </div>
      </div>
      <div className="max-sm:mt-[1rem] mt-[2.5rem]">
        <Thumb slider={true} data={products} />
      </div>
    </div>
  );
};

export default RecommendedProducts;
