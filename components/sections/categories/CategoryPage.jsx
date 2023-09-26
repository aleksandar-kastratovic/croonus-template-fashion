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
      });
    }
    setChangeFilters(false);
  }, [changeFilters]);

  const [productsPerView, setProductsPerView] = useState(4);
  const [productsPerViewMobile, setProductsPerViewMobile] = useState(2);
  const [filterOpen, setFilterOpen] = useState(false);

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  
  useEffect(() => {
    const generateBreadcrumbs = (category) => {
      category?.parents?.forEach((parent) => {
        if (
          !breadcrumbs.some((breadcrumb) => breadcrumb?.name === parent?.name)
        ) {
          setBreadcrumbs((prevBreadcrumbs) => [
            ...prevBreadcrumbs,
            {
              name: parent?.name,
              slug: parent?.slug,
            },
          ]);
        }
      });
    };

    if (singleCategory) {
      generateBreadcrumbs(singleCategory);
    }
  }, [singleCategory, breadcrumbs]);
  
  console.log(breadcrumbs)
  
  return (
    <div>
      <div className="px-5 lg:px-20">
      {breadcrumbs?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-5">
            <Link
              href={`/`}
              className="text-[#191919] text-[0.95rem] font-normal hover:text-[#e10000]"
            >
              Početna
            </Link>{" "}
            <i className="fas fa-chevron-right text-[#191919] text-[0.6rem]"></i>
            {breadcrumbs?.map((breadcrumb, index, arr) => {
              return (
                <div className="flex items-center gap-2">
                  <Link
                    href= {`/kategorije/${breadcrumb?.slug}`}
                    className="text-[#191919] text-[0.95rem] font-normal hover:text-[#e10000]"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr.length - 1 && (
                    <i className="fas fa-chevron-right text-[#191919] text-[0.6rem]"></i>
                  )}
                </div>
              );
            })}
            <i className="fas fa-chevron-right text-[#191919] text-[0.6rem]"></i>
            <h1 className="text-[#191919] text-[0.95rem] font-normal">
              {singleCategory?.basic_data?.name}
            </h1>
          </div>
        )}
      </div>
      <div className="mt-[80px] flex flex-col items-center justify-center">
        <div className="flex flex-row max-sm:flex-col items-center justify-center">
          <h1 className="text-[29px] font-normal uppercase">
            {singleCategory?.basic_data?.name}
          </h1>
          <span className="text-[29px] font-normal uppercase">
            &nbsp;Kolekcija
          </span>
        </div>
        <p className="text-center text-[1.03rem] max-w-[36.075rem] font-light sm:mt-[35px]">
          {singleCategory?.basic_data?.description}
        </p>
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
        />
      </div>
      <div
        className={`flex items-center gap-5 w-[95%] mx-auto mt-[60px] md:hidden`}
      >
        <button
          className={`flex items-center justify-center text-[1.2rem] text-center py-2 flex-1 border`}
          onClick={() => setFilterOpen(true)}
        >
          Filteri
        </button>
        <div className={`flex items-center gap-3`}>
          <Image
            src={`/icons/square.svg`}
            width={30}
            height={30}
            alt="square"
            onClick={() => {
              setProductsPerViewMobile(1);
            }}
          />
          <Image
            src={`/icons/grid.png`}
            width={30}
            height={30}
            alt="grid"
            onClick={() => {
              setProductsPerViewMobile(2);
            }}
          />
        </div>
      </div>
      <div className={`max-lg:hidden px-20`}>
        <div
          className={`mt-[1.875rem] ${productsPerView === 2 && "w-[50%] mx-auto"
            } grid grid-cols-${productsPerView} gap-x-[40px] gap-y-[66px]`}
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
      <div className={`lg:hidden px-5 lg:px-20`}>
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
            ? `fixed top-0 left-0 w-full h-full z-[100] bg-white translate-x-0 duration-500`
            : `fixed top-0 left-0 w-full h-full z-[100] bg-white -translate-x-full duration-500`
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
        />
      </div>
    </div>
  );
};

export default CategoryPage;
