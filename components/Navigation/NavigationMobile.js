"use client";
import { get, list } from "@/app/api/api";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useCartContext } from "@/app/api/cartContext";
import Link from "next/link";
import Burger from "../../assets/Icons/hamburger.png";
import Logo from "../../assets/Logo/pazari-logo-dark.png";
import Search from "../../assets/Icons/search.png";
import { useRouter, usePathname } from "next/navigation";
import User from "../../assets/Icons/user.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import Wishlist from "../../assets/Icons/heart.png";
import Thumb from "../Thumb/Thumb";

const NavigationMobile = () => {
  const router = useRouter();
  const [cart, , wishList] = useCartContext();
  const pathname = usePathname();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishlistCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList]);

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
    firstCategory: null,
  });
  const [lastActiveCategory, setLastActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
  });
  let exActiveIds = [];
  const [activeImage, setActiveImage] = useState();
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
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScrollIconDisappear = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setSearchVisible(true);
      } else {
        setSearchVisible(false);
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScrollIconDisappear);
    return () => {
      window.removeEventListener("scroll", handleScrollIconDisappear);
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      getCartCount();
      router?.refresh();
    }
  }, [pathname]);

  return (
    <>
      <div className="md:hidden w-full z-[2000] sticky top-0 bg-white bg-opacity-90 backdrop-blur-md">
        <div className="w-[95%] py-3 mx-auto flex justify-between items-center">
          <div onClick={() => setMenuOpen(true)}>
            <Image src={Burger} width={30} height={30} />
          </div>
          <Link href="/">
            <div className="pr-20">
              <Image src={Logo} width={100} height={50} />
            </div>
          </Link>
          <div className="relative flex items-center gap-4">
            {" "}
            {pathname === "/" ? (
              <div
                className={
                  searchVisible
                    ? `visible transition-all duration-500 opacity-100`
                    : `invisible transition-all duration-500 opacity-0`
                }
              >
                <Image
                  src={Search}
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            ) : (
              <div>
                <Image
                  src={Search}
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            )}
            <Image src={User} width={33} height={33} />
            <Link href="/korpa">
              <div className="relative">
                <Image src={Cart} width={33} height={33} />
                {cartCount > 0 && (
                  <span className="absolute text-white text-xs -top-1 right-0 bg-[#e10000] px-1 py-0 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>{" "}
      </div>
      <div
        className={
          searchVisible
            ? `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } md:hidden bg-transparent  invisible sticky top-[60px] transition-all duration-500 opacity-0 z-[4000] `
            : `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } md:hidden bg-transparent visible sticky top-[60px] z-[4000] transition-all duration-500 opacity-100 `
        }
      >
        <form
          className="w-[95%] mx-auto h-12 mt-12 py-2 flex items-center absolute"
          onClick={() => setSearchOpen(true)}
        >
          <div
            type="text"
            className="w-full h-full bg-transparent focus:border-white focus:outline-none focus:ring-0 placeholder:text-white text-white text-xs border-white border  rounded-lg py-2 pl-8 mix-blend-difference placeholder:text-xs"
            placeholder="Pretraga"
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseDown={() => setSearchOpen(true)}
          />
          <h1 className="absolute left-8 text-sm">Pretraga</h1>
          <i className="text-xs text-white fa-solid fa-search absolute left-2 top-5"></i>
        </form>
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
                className="flex flex-row items-center justify-between gap-5"
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
                      firstCategory: true,
                    });
                    setActiveImage(category?.image);
                    setGenerateBreadcrumbs(category?.slug_path);
                  }}
                >
                  {category?.name}
                </h1>
              </div>
            );
          })}{" "}
          <div
            className="self-end justify-self-end ml-auto relative"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <Link href="/lista-zelja">
              {" "}
              <Image src={Wishlist} width={20} height={20} className="py-1 " />
            </Link>
            <span className="absolute -top-2 -right-1 bg-[#e10000] rounded-full text-white px-1 text-xs">
              {wishlistCount}
            </span>
          </div>
        </div>
        {activeImage && (
          <div className="mt-5 w-[95%] mx-auto relative h-[200px] ">
            <Image
              src={activeImage}
              className="rounded h-full object-cover"
              width={2000}
              height={2000}
            />
          </div>
        )}

        {generateBreadcrumbs && generateBreadcrumbs.split("/").length > 1 && (
          <div className="w-[95%] mx-auto mt-5">
            <button
              className="flex items-center justify-between w-full gap-5"
              onClick={() => {
                let datatmp = [];
                let imagetmp = "";
                const data = categories?.map((category) => {
                  if (category?.id === activeCategory?.parentCategory) {
                    datatmp = category?.children;
                  }
                });
                const image = categories?.map((category) => {
                  if (category?.id === activeCategory?.parentCategory) {
                    imagetmp = category?.image;
                  }
                });
                setActiveCategory({
                  id: activeCategory?.parentCategory,
                  data: datatmp,
                  parentCategory: activeCategory?.parentCategory,
                  firstCategory: true,
                });
                setActiveImage(imagetmp);
                setGenerateBreadcrumbs();
              }}
            >
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-chevron-left text-base"></i>
                <h1 className="text-[0.9rem] font-normal">Nazad</h1>
              </div>
              {generateBreadcrumbs &&
              generateBreadcrumbs.split("/").length > 1 ? (
                <h1 className="text-[0.9rem] font-normal">
                  {generateBreadcrumbs
                    .split("/")
                    .map((breadcrumb, index, array) => {
                      let spacedBreadcrumb =
                        breadcrumb.charAt(0).toUpperCase() +
                        breadcrumb.slice(1);
                      if (index < array.length - 1) {
                        spacedBreadcrumb += " / ";
                      }
                      return spacedBreadcrumb;
                    })}
                </h1>
              ) : null}
            </button>
          </div>
        )}

        <div className="mt-5 w-[95%] overflow-y-auto mx-auto flex flex-col gap-5">
          {activeCategory?.data?.length > 0 &&
            activeCategory?.data?.map((category) => {
              return (
                <div
                  className="flex flex-row w-full items-center justify-between gap-5"
                  key={category?.id}
                >
                  {category?.children?.length > 0 ? (
                    <div
                      className={`${
                        activeCategory.firstCategory
                          ? `uppercase flex flex-row w-full items-center justify-between`
                          : `uppercase flex flex-row w-full items-center justify-between`
                      } text-[0.9rem]`}
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
                        exActiveIds.push(category?.id);
                      }}
                    >
                      <h1>{category?.name}</h1>
                      {category?.children?.length > 0 && (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={`/kategorije/${category?.slug_path}`}
                      className={`${
                        activeCategory.firstCategory
                          ? `uppercase w-full`
                          : `w-full`
                      } text-[0.9rem]`}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveCategory({
                          id: categories[0]?.id,
                          data: categories[0]?.children,
                          parentCategory: categories[0]?.id,
                        });
                        setActiveImage(categories[0]?.image);
                        setGenerateBreadcrumbs();
                        setLastActiveCategory({
                          id: categories[0]?.id,
                          data: categories[0]?.children,
                        });
                      }}
                    >
                      {category?.name}
                    </Link>
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
      {searchOpen && (
        <div className="fixed top-0 left-0 bg-white  w-screen h-screen z-[10000]">
          <div className="w-[95%] mt-6 mx-auto flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative w-[90%] ">
              <input
                type="text"
                className="w-full border  border-[#191919] focus:border-[#191919] focus:outline-none focus:ring-0 placeholder:text-xs text-xs rounded-lg pl-10"
                placeholder="Unesite pojam za pretragu "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute top-1/2 transform -translate-y-1/2 text-sm left-3 text-[#191919]"></i>
            </form>
            <p className="text-xs" onClick={() => setSearchOpen(false)}>
              Otkaži
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationMobile;
