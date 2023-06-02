"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCartContext } from "@/app/api/cartContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { get, list } from "@/app/api/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoDark from "../../assets/Logo/pazari-logo-dark.png";
import LogoLight from "../../assets/Logo/pazari-logo-light.png";
import User from "../../assets/Icons/user.png";
import Wishlist from "../../assets/Icons/heart.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import Search from "../../assets/Icons/search.png";

const NavigationDesktop = () => {
  const pathname = usePathname();
  const { push: navigate, asPath } = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  let category = false;
  if (pathname === "/") {
    category = false;
  } else {
    category = true;
  }
  useEffect(() => {
    const getCategories = async () => {
      const data = await get("/categories/product/tree").then((response) =>
        setCategories(response?.payload)
      );
    };
    getCategories();
  }, []);

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishListCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList, wishListCount]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart, cartCount]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?search=${searchTerm}`);
    setSearchTerm("");
  };
  const [isActive, setIsActive] = useState(categories[0]?.id);
  const [activeCategory, setActiveCategory] = useState();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const category = categories.filter((category) => category?.id === isActive);
    setIsActive(category[0]?.id);
  }, [isActive]);

  useEffect(() => {
    const slider = document.getElementById("slider");
    const sliderHeight = slider?.offsetHeight;
    setHeight(sliderHeight);
  });
  const [open, setOpen] = useState(false);
  const [isActiveSubcategory, setIsActiveSubcategory] = useState({
    id: undefined,
    slug: undefined,
  });
  const [activeSubSubCategory, setActiveSubSubCategory] = useState();
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    if (category) {
      setBackground("white");
    }

    function handleScroll() {
      if (category) {
        setBackground("white");
      } else {
        if (window.scrollY > 1 && !category) {
          setBackground("white");
        } else {
          setBackground("transparent");
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [category, background]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 0 && !open) {
        setVisible(false);
      } else {
        if (open && scrollY > 0) {
          setVisible(true);
        } else {
          if (scrollY === 0 && pathname === "/") {
            setVisible(true);
          } else {
            if (scrollY >= 0 && pathname !== "/") setVisible(false);
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, visible, background, pathname]);
  useEffect(() => {
    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (categories) {
      setIsActive(categories[0]?.id);
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  return (
    <>
      <div
        className={`max-md:hidden sticky top-0 z-[54] flex items-center justify-between w-full bg-${
          category ? `white` : `${background}`
        } ${background === "white" ? `bg-opacity-70 backdrop-blur` : ``}`}
        id="navigation"
      >
        <div
          className={`absolute top-0  ${
            background === "white" ? `bg-opacity-90 backdrop-blur` : `pt-8`
          } px-[3%] z-[54] flex items-center justify-between w-full bg-${
            category ? `white` : `${background}`
          }  transition-all duration-500`}
        >
          <div
            className="flex items-center py-[1.5rem] gap-20 "
            // onMouseEnter={() => {
            //   if (background === "white") {
            //     setOpen(true);
            //   }
            // }}
            // onMouseLeave={() => {
            //   if (background === "white") {
            //     setOpen(true);
            //   }
            // }}
          >
            <Link
              href="/"
              onMouseEnter={() => {
                setOpen(true);
              }}
            >
              {open || background === "white" ? (
                <Image src={LogoDark} width={110} height={110} alt="" />
              ) : (
                <Image src={LogoLight} width={110} height={110} alt="" />
              )}
            </Link>
            <div
              className="flex flex-row items-center gap-5 "
              // onMouseEnter={() => setOpen(true)}
            >
              {categories?.map((category, index) => {
                const isActiveCategory = isActive === category?.id;

                return (
                  <div
                    key={category?.id}
                    className={`uppercase ${
                      (isActiveCategory && !open && background === "transparent"
                        ? `bg-white text-black`
                        : isActiveCategory && !open && background === "white"
                        ? `bg-black text-white`
                        : !isActiveCategory &&
                          !open &&
                          background === "transparent" &&
                          `text-white`) ||
                      ((open &&
                        isActiveCategory &&
                        background === "transparent") ||
                      (open && isActiveCategory && background === "white")
                        ? `bg-black text-white`
                        : `text-black`) ||
                      (open && isActiveCategory && background === "white"
                        ? `bg-red-500 text-white`
                        : `bg-red-500 text-white`)
                    } px-5 py-1 text-[0.8rem] rounded cursor-pointer`}
                    onClick={() => {
                      setIsActive(category?.id);
                      setActiveCategory(category);
                      setActiveSubSubCategory();
                    }}
                  >
                    {category?.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-5">
              <Image
                src={Search}
                width={20}
                height={20}
                alt=""
                onClick={handleSearch}
                className={
                  background === "white"
                    ? "cursor-pointer "
                    : "cursor-pointer invert"
                }
              />
              <form onSubmit={handleSearch} className="w-60">
                <input
                  type="text"
                  placeholder="PRETRAGA"
                  className={`bg-transparent border-l-0 w-full border-t-0 border-r-0 border-b ${
                    background === "white"
                      ? "border-b-black text-black"
                      : "border-b-white focus:border-b-white placeholder:text-white text-white"
                  }  focus:ring-0 placeholder:text-sm text-sm p-0   focus:outline-none`}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  value={searchTerm}
                />
              </form>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/stranica-u-izradi">
                <Image
                  src={User}
                  width={40}
                  height={40}
                  alt=""
                  className={
                    background === "white" ? "wiggle" : "invert wiggle"
                  }
                />
              </Link>
              <Link href="/lista-zelja">
                {" "}
                <div className="relative">
                  <Image
                    src={Wishlist}
                    width={30}
                    height={30}
                    alt=""
                    className={
                      background === "white" ? "wiggle" : "invert wiggle"
                    }
                  />
                  <span className="absolute -top-2.5 text-white -right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                    {wishListCount}
                  </span>
                </div>
              </Link>
              <Link href="/korpa">
                <div className="relative">
                  <Image
                    src={Cart}
                    width={40}
                    height={40}
                    alt=""
                    className={
                      background === "white" ? "wiggle" : "invert wiggle"
                    }
                  />
                  <span className="absolute -top-1 text-white -right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                    {cartCount}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          open
            ? `max-md:hidden fixed  left-0 top-0  lg:min-w-[480px]  4xl:min-w-[500px] h-full z-[52]  flex flex-col px-[3%] ${
                background === "white" ? `py-4` : `pt-8`
              } gap-[162px] bg-white transition-all duration-500`
            : `max-md:hidden fixed ${
                background === "white" ? `invisible` : ``
              } duration-500 transition-all left-0 top-0  lg:min-w-[480px]  4xl:min-w-[500px] h-full z-[52]  flex flex-col px-[3%] ${
                background === "white" ? `py-4` : `pt-8`
              } gap-[162px] bg-transparent transition-all duration-500`
        }
        onMouseEnter={() => {
          if (background === "white") {
            null;
          } else {
            setOpen(true);
          }
        }}
        onMouseLeave={() => setOpen(false)}
      >
        <div
          className={`bg-${background} flex items-center gap-20 sticky top-5 w-full `}
        ></div>
        <div
          className={
            visible
              ? `sticky top-[100px] translate-x-0 transition-all duration-[700ms]`
              : `-translate-x-full duration-[900ms] transition-all`
          }
        >
          <div
            className={
              open
                ? `flex flex-row gap-10 text-black transition-all duration-500`
                : `text-white flex flex-row gap-10 transition-all duration-500`
            }
          >
            <div className="h-full flex flex-col gap-10">
              <div className="flex flex-col gap-1 mix-blend-difference">
                <Link
                  href="/"
                  className="uppercase  hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                >
                  Novo
                </Link>
                <Link
                  href="/"
                  className="uppercase text-red-500 hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                >
                  Promocije: do 50% popusta
                </Link>
              </div>
              <div className="flex flex-col gap-1 mix-blend-difference">
                {activeCategory?.children?.map((category) => {
                  const isActiveCategory =
                    isActiveSubcategory.id === category?.id;
                  return (
                    <div
                      key={category?.id}
                      className={
                        isActiveCategory
                          ? ` relative uppercase flex gap-4 items-center cursor-pointer text-lg hover:text-slate-500 hover:translate-x-5 transition-all duration-300 font-medium `
                          : `uppercase cursor-pointer text-lg hover:text-slate-500 hover:translate-x-5 transition-all duration-300 font-medium`
                      }
                    >
                      {category?.children?.length > 0 ? (
                        <h1
                          onClick={() => {
                            setIsActiveSubcategory({
                              id: category?.id,
                              slug: category?.slug,
                            });
                            setActiveSubSubCategory(category?.children);
                          }}
                        >
                          {category?.name}
                        </h1>
                      ) : (
                        <Link
                          href={`/kategorije/${category?.slug_path}`}
                          onClick={() => {
                            setOpen(false);
                            setVisible(false);
                            setBackground("white");
                          }}
                        >
                          {category?.name}
                        </Link>
                      )}

                      <div
                        className={
                          isActiveCategory && open && activeSubSubCategory
                            ? `line relative`
                            : `hidden`
                        }
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="uppercase  hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                >
                  Outlet
                </Link>
              </div>
            </div>
            <div
              className={
                open
                  ? `opacity-100 h-[550px] overflow-y-auto overflow-x-hidden transition-all duration-500 flex flex-col gap-2`
                  : `invisible opacity-0 duration-500 transition-all flex flex-col gap-2`
              }
            >
              {activeSubSubCategory?.map((category) => {
                return (
                  <div className="text-black text-xs hover:text-slate-500 hover:translate-x-2 transition-all duration-300 font-medium">
                    <Link
                      href={`/kategorije/${category?.slug_path}`}
                      onClick={() => {
                        setOpen(false);
                        setVisible(false);
                        setBackground("white");
                      }}
                    >
                      {category?.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDesktop;
