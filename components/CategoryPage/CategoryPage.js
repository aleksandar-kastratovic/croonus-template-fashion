"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import FilterIcon from "../../assets/Icons/filter.png";
import Thumb from "../Thumb/Thumb";
import { list, post } from "@/app/api/api";
import Filters from "../Filters/Filters";
const CategoryPage = ({ filter, singleCategory }) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [openFilter, setOpenFilter] = useState(false);
  const [productData, setProductData] = useState({
    products: [],
    pagination: {},
  });
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async (limit, page, sort, selectedFilters) => {
      const getProductList = await list(
        `/products/category/list/${singleCategory?.id}`,
        {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        }
      ).then((res) => {
        setProductData({
          products: res?.payload?.items,
          pagination: res?.payload?.pagination,
        });

        setLoading(false);
      });

      return getProductList;
    };
    getProducts(limit, page, sort, selectedFilters);
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

  return (
    <>
      <div className="4xl:container mx-auto">
        <div className="px-[3%] max-md:mt-[2rem] mt-[9rem] flex items-center justify-between">
          <h1 className="font-bold text-[1.313rem] text-[#191919]">
            {singleCategory?.basic_data?.name}
          </h1>
          <div
            className="border-2 max-[365px]:w-[200px] w-[243px] h-[50px] border-[#171717] flex items-center gap-[30px] pl-[14px] cursor-pointer"
            onClick={() => setOpenFilter(true)}
          >
            <Image src={FilterIcon} alt="Filter" width={30} height={30} />
            <h1 className="uppercase font-bold text-[13.74px] text-[#191919]">
              Filteri
            </h1>
          </div>
        </div>
        <div className="mx-[0.625rem] mt-[4.125rem]">
          <div className="grid max-md:grid-cols-1 gap-y-[40px] grid-cols-4 gap-[11px]">
            {loading ? (
              <div className="h-full col-span-1 w-full bg-[#eeeee0] object-cover animate-pulse"></div>
            ) : (
              <Thumb
                data={productData?.products}
                slider={false}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed overflow-y-auto flex flex-col justify-between z-[100] top-0 right-0 bg-white shadow-lg translate-x-0 transition-all duration-500 h-screen w-[26.125rem]`
            : `
      fixed flex flex-col justify-between z-[100] top-0 right-0 bg-white shadow-lg translate-x-full transition-all duration-500 h-screen w-[26.125rem]`
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
                  className="fas fa-x ml-auto text-[#a3a3a3] cursor-pointer text-xl"
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
