"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import FilterIcon from "../../assets/Icons/filter.png";
import Thumb from "../Thumb/Thumb";
import { list, post } from "@/app/api/api";
import Filters from "../Filters/Filters";

const CategoryPage = ({ filter, singleCategory, products }) => {
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
  const [page, setPage] = useState();
  const [limit, setLimit] = useState(-1);
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

  useEffect(() => {
    const updateProductsCountBasedOnTempSelectedFilters = async (
      tempSelectedFilters
    ) => {
      const getProductList = await list(
        `/products/category/list/${singleCategory?.id}`,
        {
          filters: tempSelectedFilters,
          limit: limit,
          page: page,
          sort: sort,
        }
      ).then((res) => {
        setProductData({
          products:
            productData?.products?.length === 0 ||
            tempSelectedFilters?.length === 0
              ? res?.payload?.items
              : productData?.products,
          pagination: res?.payload?.pagination,
        });

        setLoading(false);
      });
    };
    updateProductsCountBasedOnTempSelectedFilters(tempSelectedFilters);
  }, [tempSelectedFilters]);

  const setNextPage = (currentPage) => {
    setPage(currentPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowPosition + windowHeight >= documentHeight - 80) {
        setNextPage(page);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

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
