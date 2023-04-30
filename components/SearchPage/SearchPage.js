"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { list } from "@/app/api/api";
import Thumb from "../Thumb/Thumb";

const SearchPage = () => {
  const params = useSearchParams();
  const search = params.get("search");
  const [returnedProducts, setReturnedProducts] = useState([]);
  useEffect(() => {
    const getProducts = async (search) => {
      const getProducts = await list("/products/search/list", { search }).then(
        (response) => setReturnedProducts(response?.payload?.items)
      );
    };
    getProducts(search);
  }, []);
  return (
    <>
      {returnedProducts?.length > 0 ? (
        <div className="mt-[1.2rem] gap-y-[20px] gap-x-5 lg:mt-[9rem] mx-[0.625rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 font-bold text-[1.5rem] py-3">
            Rezultati pretrage za termin "{search}"
          </h1>
          <Thumb data={returnedProducts} slider={false} />
        </div>
      ) : (
        <div className="mx-[0.625rem] mt-[1.2rem] lg:mt-[9rem]">
          <div className="flex items-start justify-start flex-col">
            <h1 className="font-bold text-[1.5rem]">
              Vaša pretraga "{search}" nije dala nikakve rezultate.
            </h1>
            <h2></h2>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
