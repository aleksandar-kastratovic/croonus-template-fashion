"use client";
import { useState, useEffect } from "react";
import { list, post } from "@/app/api/api";
// import Filters from "./Filters";
// import FiltersMobile from "./FilterMobile";
import Image from "next/image";
import Link from "next/link";
import Thumb from "@/components/Thumb/Thumb";
import Filters from "./Filters";
import FiltersMobile from "./FilterMobile";

const CategoryPage = ({ filter, singleCategory, products }) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  console.log(filter);
  const [productData, setProductData] = useState({
    products: products?.items,
    pagination: products?.pagination,
  });
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(-1);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  useEffect(() => {
    const getProducts = async (limit, page, sort, selectedFilters) => {
      const getProductList = await list(
        `/products/category/list/${singleCategory?.id}`,
        {
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
    console.log("TU SAM");
    if (changeFilters) {
      post(`/products/category/filters/${singleCategory?.id}`, {
        filters: tempSelectedFilters,
      }).then((response) => {
        const lastSelectedFilterValues = tempSelectedFilters?.find((item) => {
          return item?.column === lastSelectedFilterKey;
        });

        const lastSelectedFilter = availableFilters?.find((item) => {
          return item?.key === lastSelectedFilterKey;
        });

        const filterLastSelectedFromResponse = response?.payload?.filter(
          (item) => {
            return item?.key !== lastSelectedFilterKey;
          }
        );

        const indexOfLastSelectedFilter = availableFilters?.findIndex(
          (index) => {
            return index?.key === lastSelectedFilterKey;
          }
        );

        if (
          lastSelectedFilter &&
          lastSelectedFilterValues?.value?.selected?.length > 0
        ) {
          setAvailableFilters([
            ...filterLastSelectedFromResponse.slice(
              0,
              indexOfLastSelectedFilter
            ),
            lastSelectedFilter,
            ...filterLastSelectedFromResponse.slice(indexOfLastSelectedFilter),
          ]);
        } else {
          setAvailableFilters(response?.payload);
        }
      });
      setChangeFilters(false);
    }
  }, [changeFilters]);

  const [productsPerView, setProductsPerView] = useState(4);
  const [productsPerViewMobile, setProductsPerViewMobile] = useState(2);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div>
      <div className="px-5 lg:px-[3rem]">
        {singleCategory?.parents?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-5">
            <Link
              href={`/`}
              className="text-[#191919] text-[0.95rem] font-normal"
            >
              Početna
            </Link>
            <>/</>
            {singleCategory?.parents?.map((breadcrumb, index, arr) => {
              return (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/kategorije/${breadcrumb?.slug}`}
                    className="text-[#191919] text-[0.95rem] font-normal"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr.length - 1 && <>/</>}
                </div>
              );
            })}
            <>/</>
            <h1 className="text-[#191919] text-[0.95rem] font-semibold">
              {singleCategory?.basic_data?.name}
            </h1>
          </div>
        )}
      </div>
      <div className="mt-[30px] md:mt-[80px] flex flex-col items-center justify-center">
        <div className="flex flex-row max-sm:flex-col items-center justify-center">
          <h1 className="text-[23px] md:text-[29px] font-normal uppercase">
            {singleCategory?.basic_data?.name}
          </h1>
          <span className="text-[23px] md:text-[29px] font-normal uppercase">
            &nbsp;Kolekcija
          </span>
        </div>
        <p
          className="text-center max-md:text-[0.85rem] max-md:mt-[20px] md:text-[16.48px] max-w-[36.075rem] font-normal sm:mt-[35px]"
          dangerouslySetInnerHTML={{
            __html: singleCategory?.basic_data?.description,
          }}
        ></p>
      </div>
      <div className="max-md:hidden mt-[67px]">
        <Filters
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={productData?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setTempSelectedFilters={setTempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
          setChangeFilters={setChangeFilters}
          filter={filter}
        />
      </div>
      <div
        className={`flex items-center gap-5 w-full px-2 mx-auto mt-[60px] md:hidden bg-white sticky top-[3.4rem] py-2 z-[51]`}
      >
        <button
          className={`flex items-center justify-center text-[0.9rem] md:text-[1.2rem] text-center py-2 flex-1 border`}
          onClick={() => setFilterOpen(true)}
        >
          Filteri
        </button>
        <div className={`flex items-center gap-3`}>
          {/*a div 40px high and 40px wide*/}
          <div
            className={`w-[30px] h-[30px] border-2 ${
              productsPerViewMobile === 1 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(1)}
          ></div>
          {/*a div 40px high and 40px wide that has 9 smaller squares inside*/}
          <div
            className={`w-[30px] h-[30px] border grid grid-cols-2 ${
              productsPerViewMobile === 2 && "border-black"
            }`}
            onClick={() => setProductsPerViewMobile(2)}
          >
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <div
                  key={i}
                  className={`col-span-1 border ${
                    productsPerViewMobile === 2 && "border-black"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`max-lg:hidden px-[3rem]`}>
        <div
          className={`mt-[1.875rem] ${
            productsPerView === 2 && "w-[50%] mx-auto"
          } grid grid-cols-${productsPerView} gap-x-5 gap-y-10`}
        >
          <Thumb
            data={productData?.products}
            loading={loading}
            slider={false}
            category={true}
            products={false}
          />
        </div>
      </div>
      <div className={`lg:hidden w-[95%] mx-auto`}>
        <div
          className={`mt-[50px] grid grid-cols-${productsPerViewMobile} md:grid-cols-3 gap-x-[20px] gap-y-[36px]`}
        >
          <Thumb
            data={productData?.products}
            loading={loading}
            slider={false}
            category={true}
            products={false}
            productsPerViewMobile={productsPerViewMobile}
          />
        </div>
      </div>
      <div
        className={
          filterOpen
            ? `fixed top-0 left-0 w-full h-full z-[3000] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-full z-[3000] bg-white -translate-x-full duration-500`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          setSort={setSort}
          changeFilters={changeFilters}
          pagination={productData?.pagination}
          setProductsPerView={setProductsPerView}
          productsPerView={productsPerView}
          setFilterOpen={setFilterOpen}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
