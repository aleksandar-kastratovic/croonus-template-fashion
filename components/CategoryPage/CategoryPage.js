"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import FilterIcon from "../../assets/Icons/filter.png";
import Thumb from "../Thumb/Thumb";
import { list, post } from "@/app/api/api";
import Filters from "../Filters/Filters";

const CategoryPage = ({ filter, singleCategory, products }) => {
  const [productData, setProductData] = useState({
    products: [],
    pagination: {},
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1); // Start from page 1
  const [limit, setLimit] = useState(12);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await list(`/products/category/list/${singleCategory?.id}`, {
        limit,
        sort,
        page,
        filters: selectedFilters,
      });
      const newProducts = res?.payload?.items || [];
      const newPagination = res?.payload?.pagination || {};
      setProductData((prevData) => ({
        products: [...prevData.products, ...newProducts], // Append new products to existing ones
        pagination: newPagination,
      }));
      setLoading(false);
    };

    fetchData();
  }, [limit, sort, page, selectedFilters]);

  useEffect(() => {
    if (changeFilters) {
      post(`/products/category/filters/${singleCategory?.id}`, {
        filters: tempSelectedFilters,
      }).then((response) => {
        setAvailableFilters(response?.payload);
        console.log(response.payload);
      });
    }
    setChangeFilters(false);
  }, [changeFilters]);

  useEffect(() => {
    const updateProductsCountBasedOnTempSelectedFilters = async (
      tempSelectedFilters
    ) => {
      const res = await list(`/products/category/list/${singleCategory?.id}`, {
        filters: tempSelectedFilters,
        limit,
        page,
        sort,
      });

      setProductData((prevData) => ({
        products:
          prevData.products.length === 0 || tempSelectedFilters.length === 0
            ? res?.payload?.items
            : prevData.products,
        pagination: res?.payload?.pagination,
      }));

      setLoading(false);
    };

    updateProductsCountBasedOnTempSelectedFilters(tempSelectedFilters);
  }, [tempSelectedFilters]);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 200; // Adjust the buffer value according to your needs

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - buffer &&
        !loading &&
        productData.pagination.total_pages > page
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, page, productData.pagination.total_pages]);

  return (
    <>
      <div className="4xl:container mx-auto">
        <div className="px-[3%] max-md:mt-[2rem] mt-[9rem] flex items-center justify-between">
          <h1 className="font-bold text-[1.313rem] max-md:text-[1rem] text-[#191919]">
            {singleCategory?.basic_data?.name}
          </h1>
          <div
            className="border-2 max-md:border max-[365px]:w-[150px] max-md:h-[40px] max-md:w-[132px] w-[243px] h-[50px] border-[#171717] flex items-center md:gap-[30px] pl-[14px] cursor-pointer"
            onClick={() => setOpenFilter(true)}
          >
            <Image src={FilterIcon} alt="Filter" width={20} height={20} />
            <h1 className="uppercase max-md:pl-4 font-bold text-[13.74px] text-[#191919]">
              Filteri
            </h1>
          </div>
        </div>
        <div className="mx-[0.625rem] mt-[4.125rem]">
          <div className="grid max-md:grid-cols-2 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
            {loading ? (
              <div className="h-full col-span-1 w-full bg-[#eeeee0] object-cover animate-pulse"></div>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <Thumb
                  data={productData?.products}
                  slider={false}
                  loading={loading}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed overflow-y-auto flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-0 transition-all duration-500 h-screen max-md:w-screen w-[26.125rem]`
            : `
      fixed flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-full transition-all duration-500 h-screen w-[26.125rem]`
        }
      >
        <div>
          <div className="border-l-0 border-t-0 border-r-0 border-b border-b-[#ededed] py-[1.563rem]">
            <div className="mx-[1.25rem] flex text-center items-center justify-end">
              <h1 className="text-[#191919] self-center mx-auto text-[0.938rem] font-bold">
                Filtriraj
              </h1>
              <div className="self-end">
                <i
                  className="fas fa-times ml-auto text-[#a3a3a3] cursor-pointer text-xl"
                  onClick={() => setOpenFilter(false)}
                ></i>
              </div>
            </div>
          </div>
          <div className="mx-[1.25rem] mt-[1.245rem] max-h-full h-full">
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              availableFilters={availableFilters}
              changeFilters={changeFilters}
              setTempSelectedFilters={setTempSelectedFilters}
              tempSelectedFilters={tempSelectedFilters}
              setChangeFilters={setChangeFilters}
              setSort={setSort}
              sort={sort}
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-t-[#ededed]">
          <div className="mx-[1.25rem] py-[2.813rem] flex gap-[20px] items-center">
            <button
              className="w-[7.625rem] h-[3.188rem] text-sm font-bold border border-[#191919] text-[#191919] uppercase flex items-center justify-center text-center"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters([]);
                setTempSelectedFilters([]);
                setChangeFilters(true);
                setSort({ field: "", direction: "" });
              }}
            >
              Obriši
            </button>
            <button
              className="w-[237px] h-[3.188rem] text-sm font-bold border bg-[#191919] text-white uppercase flex items-center justify-center text-center"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters(tempSelectedFilters);
                setChangeFilters(true);
                setOpenFilter(false);
              }}
            >
              Prikaži rezultate ({productData.pagination?.total_items})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
