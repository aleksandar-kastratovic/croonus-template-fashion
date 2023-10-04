"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import HeaderContainerLinks from "./HeaderContainerLinks";
import { get, list } from "@/app/api/api";
import HeaderIcons from "./HeaderIcons";
import SearchProducts from "./SearchProducts";
import Translate from "../Translate/Translate";

const Header = ({ categories }) => {
  const categoriesMain = [
    { name: "Početna", slug: "/", isCategory: false },
    ...categories,
    { name: "Brendovi", slug: "/brendovi", isCategory: false },
    { name: "Blog", slug: "/blog", isCategory: false },
    { name: "Maloprodaje", slug: "/maloprodaje", isCategory: false },
    { name: "Kontakt", slug: "/kontakt", isCategory: false },
  ];

  const [activeCategory, setActiveCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: [],
    image: null,
  });

  const [activeSubCategory, setActiveSubCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: [],
  });

  const [landingPagesList, setLandingPagesList] = useState([]);

  useEffect(() => {
    const getLandingPages = async () => {
      const data = await list(`/landing-pages/list`).then((response) =>
        setLandingPagesList(response?.payload)
      );
    };
    getLandingPages();
  }, []);

  const resetActiveCategory = () => {
    setActiveCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setActiveSubCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
    });
  };

  return (
    <>
      <header className="max-xl:hidden top-0 sticky w-full z-[101] bg-white border-b-4 border-topHeader">
        <HeaderTop />
        <div className="py-5 px-[3rem] flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              width={185}
              height={39}
              className="object-cover"
              alt="logo"
            />
          </Link>

          <div
            className={`xl:mr-[13%] 2xl:mr-[15%]3xl:mr-[20%] flex items-center gap-4`}
          >
            {categoriesMain?.map((category, index) => {
              const isCategory = category?.isCategory ?? true;
              return isCategory ? (
                <button
                  key={index}
                  className={`${
                    category?.id === activeCategory?.id
                      ? "activeCategory "
                      : "font-normal"
                  } text-[13px] uppercase block relative w-fit text-black`}
                  onClick={() => {
                    setActiveCategory({
                      id:
                        category?.id === activeCategory?.id
                          ? null
                          : category?.id,
                      name:
                        category?.name === activeCategory?.name
                          ? null
                          : category?.name,
                      slug:
                        category?.slug === activeCategory?.slug
                          ? null
                          : category?.slug,
                      data: category?.children ?? [],
                      image: category?.image ?? null,
                      open: !activeCategory?.open,
                    });
                  }}
                >
                  {category?.name}
                </button>
              ) : (
                <Link
                  href={`${category?.slug}`}
                  key={index}
                  onClick={resetActiveCategory}
                >
                  <span className={`text-[13px] uppercase block text-black`}>
                    {category?.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <SearchProducts />
          <div>
            <Translate />
          </div>
          <HeaderIcons />
        </div>
        {activeCategory?.open && (
          <div
            className={`absolute top-[110px] right-0 w-full bg-white z-50 h-[257px] max-lg:hidden`}
          >
            <div className="px-20 py-6 relative h-full">
              <div className="flex justify-between h-full">
                <div className="flex gap-x-[10rem]">
                  <div className={`flex flex-col items-start justify-start`}>
                    {landingPagesList?.items?.map((item, index) => {
                      return (
                        <Link
                          onClick={resetActiveCategory}
                          href={`/promo/${item?.slug}`}
                          className="uppercase text-red-500 hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium mb-1 block"
                        >
                          {item?.name}
                        </Link>
                      );
                    })}
                    {activeCategory?.data?.map((category, index) => {
                      return category?.children?.length > 0 ? (
                        <button
                          key={index}
                          className={`${
                            category?.id === activeSubCategory?.id
                              ? "font-bold"
                              : "font-normal"
                          } text-lg uppercase hover:underline block text-black`}
                          onClick={() => {
                            setActiveSubCategory({
                              id:
                                category?.id === activeSubCategory?.id
                                  ? null
                                  : category?.id,
                              name:
                                category?.name === activeSubCategory?.name
                                  ? null
                                  : category?.name,
                              slug:
                                category?.slug === activeSubCategory?.slug
                                  ? null
                                  : category?.slug,
                              data: category?.children ?? [],
                              open: !activeSubCategory?.open,
                            });
                          }}
                        >
                          {category?.name}
                        </button>
                      ) : (
                        <Link
                          href={`/kategorije/${category?.slug_path}`}
                          key={index}
                          className={`${
                            category?.id === activeCategory?.id
                              ? "activeCategory"
                              : "font-normal"
                          } text-lg uppercase hover:underline block text-black`}
                          onClick={() => {
                            setActiveCategory({
                              id: null,
                              name: null,
                              slug: null,
                              data: [],
                              image: null,
                              open: false,
                            });
                          }}
                        >
                          {category?.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="h-[85%]">
                    <h3 className="text-[15px] uppercase text-black font-bold mb-4">
                      {activeSubCategory?.name}
                    </h3>
                    <div className="h-full flex flex-col flex-wrap gap-x-6">
                      {activeSubCategory &&
                        activeSubCategory?.data?.map((childCategory) => (
                          <Link
                            href={`/kategorije/${childCategory?.slug_path}`}
                            onClick={resetActiveCategory}
                            key={childCategory?.id}
                            className="text-[15px] lowercase text-black first-letter:uppercase block hover:underline"
                          >
                            {childCategory.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className={`ml-auto`}>
                  <div className="relative aspect-video h-[200px]">
                    <Image
                      src={activeCategory?.image ?? "/fashion-img.png"}
                      alt="img-modal"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div
        onClick={() => {
          setActiveCategory({
            open: false,
            id: null,
            name: null,
            slug: null,
            data: [],
            image: null,
          });
        }}
        className={
          activeCategory?.open
            ? "fixed top-0 left-0 h-screen w-screen transition-all duration-500 bg-black/50 backdrop-blur-md opacity-100 visible z-[100]"
            : "fixed top-0 left-0 h-screen w-screen transition-all duration-500 bg-black/50 backdrop-blur-md opacity-0 invisible z-[100]"
        }
      />
    </>
  );
};

export default Header;
