"use client";
import { get, list } from "@/app/api/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Burger from "../../assets/Icons/burger.png";
import Logo from "../../assets/Logo/pazari-logo-dark.png";
import Search from "../../assets/Icons/search.png";
import { useRouter } from "next/navigation";
import User from "../../assets/Icons/user.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import Wishlist from "../../assets/Icons/heart.png";
import Thumb from "../Thumb/Thumb";
const NavigationMobile = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const getCategories = async () => {
      const getCategories = await get("/categories/product/tree").then((res) =>
        setCategories(res?.payload)
      );
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const getProducts = await list("/products/new-in/list").then((res) =>
        setProducts(res?.payload?.items)
      );
    };
    getProducts();
  }, []);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
  });
  const [lastActiveCategory, setLastActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
  });
  const [exActiveIds, setExActiveIds] = useState([]);
  const [activeImage, setActiveImage] = useState();
  console.log(activeImage);
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?search=${searchTerm}`);
    setSearchOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleBodyOverflow();
  }, [menuOpen]);
  useEffect(() => {
    setActiveCategory({
      id: categories[0]?.id,
      data: categories[0]?.children,
      parentCategory: categories[0]?.id,
    });
    setActiveImage(categories[0]?.image);
  }, [categories]);

  const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState();

  return (
    <>
      <div className="md:hidden w-full z-[2000] sticky top-0 bg-white bg-opacity-90 backdrop-blur-md">
        <div className="w-[95%] py-3 mx-auto flex justify-between items-center">
          <div onClick={() => setMenuOpen(true)}>
            <Image src={Burger} width={30} height={30} />
          </div>
          <Link href="/">
            <div className="">
              <Image src={Logo} width={100} height={50} />
            </div>
          </Link>
          <div className="relative">
            <Image
              src={Search}
              width={26}
              height={26}
              onClick={() => setSearchOpen(!searchOpen)}
            />
          </div>
        </div>
      </div>

      <div
        className={
          menuOpen
            ? `translate-x-0 flex flex-col h-screen z-[5000] w-full duration-500 transition-all fixed bg-white top-0 left-0`
            : `-translate-x-full flex flex-col h-screen z-[5000] w-full duration-500 transition-all fixed bg-white top-0 left-0`
        }
      >
        <div className="w-[95%]  mx-auto flex items-center justify-between py-3.5">
          <Image src={Logo} width={150} height={150} />
          <i
            className="fas fa-times text-2xl"
            onClick={() => setMenuOpen(false)}
          ></i>
        </div>
        <div className="w-[95%] flex flex-row gap-7 mx-auto mt-5 border-b border-b-[#e5e7eb]">
          {categories?.map((category) => {
            const isActive = activeCategory?.parentCategory === category?.id;
            return (
              <div
                className="flex flex-row items-center gap-5"
                key={category?.id}
              >
                <h1
                  className={
                    isActive
                      ? `font-bold uppercase text-[0.9rem]`
                      : `uppercase text-[0.9rem]`
                  }
                  onClick={() => {
                    setActiveCategory({
                      id: category?.id,
                      data: category?.children,
                      parentCategory: category?.id,
                    });
                    setActiveImage(category?.image);
                    setGenerateBreadcrumbs(category?.slug_path);
                  }}
                >
                  {category?.name}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="mt-5 w-[95%] mx-auto relative h-[200px] ">
          <Image
            src={activeImage}
            className="rounded h-full object-cover"
            width={2000}
            height={2000}
          />
        </div>
        {generateBreadcrumbs && generateBreadcrumbs.split("/").length > 1 ? (
          <div className="w-[95%] mx-auto mt-5">
            <h1 className="text-[0.9rem] font-bold">
              {generateBreadcrumbs
                .split("/")
                .map((breadcrumb, index, array) => {
                  let spacedBreadcrumb =
                    breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
                  if (index < array.length - 1) {
                    spacedBreadcrumb += " / ";
                  }
                  return spacedBreadcrumb;
                })}
            </h1>
          </div>
        ) : null}
        <div className="mt-5 w-[95%] mx-auto flex flex-col gap-5">
          {activeCategory?.data?.length > 0 &&
            activeCategory?.data?.map((category) => {
              return (
                <div
                  className="flex flex-row items-center justify-between gap-5"
                  key={category?.id}
                >
                  {category?.children?.length > 0 ? (
                    <h1
                      className={`uppercase text-[0.9rem]`}
                      onClick={() => {
                        setLastActiveCategory({
                          id: category?.id,
                          data: category?.children,
                        });
                        setActiveCategory({
                          id: category?.id,
                          data: category?.children,
                          parentCategory: activeCategory?.parentCategory,
                        });
                        setActiveImage(category?.image);
                        setGenerateBreadcrumbs(category?.slug_path);
                        console.log(generateBreadcrumbs);
                      }}
                    >
                      {category?.name}
                    </h1>
                  ) : (
                    <Link
                      href={`/kategorije/${category?.slug_path}`}
                      className="uppercase text-[0.9rem]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {category?.name}
                    </Link>
                  )}

                  {category?.children?.length > 0 && (
                    <i className="fas fa-chevron-right"></i>
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex  flex-col mt-10 w-[95%] mx-auto gap-3">
          <Link
            href="/"
            className="text-red-500 text-[1.2rem] uppercase animate-pulse"
          >
            Promocije: do 50% popusta
          </Link>
          <Link href="/" className="text-[1.2rem] uppercase">
            Outlet{" "}
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen z-[4000]"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavigationMobile;
