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
  });
  const [lastActiveCategory, setLastActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
  });
  const [exActiveIds, setExActiveIds] = useState([]);
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
  console.log(exActiveIds);
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
          searchOpen
            ? `translate-y-0 fixed top-0 left-0 z-[2100] duration-700 transition-all w-screen h-screen bg-white block items-center justify-center`
            : `-translate-y-[120%] fixed top-0 left-0 z-[2100] duration-700 transition-all w-screen h-screen bg-white block items-center justify-center`
        }
      >
        <div className="flex flex-col mt-2 items-center justify-center gap-3">
          <i
            className="fas fa-x text-xl  pr-5 pt-5 self-end"
            onClick={() => setSearchOpen(!searchOpen)}
          ></i>
          <form className="relative w-[95%] mx-auto" onSubmit={handleSearch}>
            <input
              type="text"
              className="w-full border border-[#e5e7eb] focus:border-[#e5e7eb] focus:outline-none rounded-md py-2 px-4 outline-none focus:ring-0 text-sm placeholder:text-xs"
              placeholder="Unesite termin pretrage"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 h-full px-4 py-2 bg-gray-300 rounded-r-md"
              onClick={handleSearch}
            >
              <i className="fas text-white fa-search"></i>
            </button>{" "}
          </form>{" "}
          <div className="max-w-full w-[95%] mx-auto">
            <h1 className="font-medium py-2 text-[1rem]">
              Možda Vas zanimaju sledeći proizvodi:
            </h1>
            <Thumb data={products} slider={true} />
          </div>
        </div>
      </div>
      <div
        className={
          menuOpen
            ? `translate-x-0 flex flex-col h-screen z-[5000] w-[80%] duration-500 transition-all fixed bg-white top-0 left-0`
            : `-translate-x-full flex flex-col h-screen z-[5000] w-[80%] duration-500 transition-all fixed bg-white top-0 left-0`
        }
      >
        <div className="w-[95%] border-b border-b-[#e5e7eb] mx-auto flex items-center justify-center py-3.5">
          <Image src={Logo} width={150} height={150} />
        </div>
        <div className="mt-5 w-[95%] mx-auto flex flex-col gap-5 max-h-[444px] overflow-y-auto">
          {activeCategory?.id === undefined && (
            <>
              {categories?.map((category) => (
                <div
                  className="relative w-[300px] h-[300px]"
                  key={category.id}
                  onClick={() => {
                    setActiveCategory({
                      id: category?.id,
                      data: category?.children,
                    });
                    setLastActiveCategory({
                      id: undefined,
                      data: categories,
                      parentCategory: undefined,
                    });
                    exActiveIds.push({ id: category?.id });
                  }}
                >
                  {category?.image && (
                    <div className="w-[300px] h-[300px]">
                      <Image
                        src={category?.image}
                        width={5000}
                        height={5000}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
                    <div className=" text-white text-2xl font-medium">
                      <h1 className="uppercase font-light text-3xl">
                        {category?.name}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {activeCategory?.id !== undefined &&
            activeCategory?.data?.length > 0 && (
              <>
                <button
                  className="w-full flex items-center justify-center gap-5 sticky top-0 bg-white z-[50] py-2"
                  onClick={() => {
                    setActiveCategory({
                      id: lastActiveCategory?.id,
                      data: lastActiveCategory?.data,
                    });
                    setLastActiveCategory({
                      id: undefined,
                      data: categories,
                      parentCategory: undefined,
                    });
                    exActiveIds.pop();
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                  Nazad
                </button>
                {activeCategory?.data?.map((category) =>
                  category?.children?.length > 0 ? (
                    <div
                      className="relative w-[300px] h-[300px]"
                      key={category.id}
                      onClick={() => {
                        setActiveCategory({
                          id: category?.id,
                          data: category?.children,
                        });
                        setLastActiveCategory({
                          id: activeCategory?.id,
                          data: activeCategory?.data,
                        });
                        exActiveIds.push({ id: category?.id });
                      }}
                    >
                      <div className="w-[300px] h-[300px]">
                        {category?.image && (
                          <Image
                            src={category?.image}
                            width={5000}
                            height={5000}
                            quality={100}
                            className="object-cover h-full "
                          />
                        )}
                      </div>

                      <div className="absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
                        <div className=" text-white text-2xl font-medium">
                          <h1 className="uppercase font-light text-3xl">
                            {category?.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={`/kategorije/${category?.slug_path}`}
                      className="relative w-[300px] h-[300px]"
                      key={category.id}
                      onClick={() => {
                        setActiveCategory({
                          id: undefined,
                          data: categories,
                        });
                        setMenuOpen(false);
                      }}
                    >
                      <div className="w-[300px] h-[300px]">
                        {category?.image && (
                          <Image
                            src={category?.image}
                            width={5000}
                            height={5000}
                            quality={100}
                            className="object-cover h-full "
                          />
                        )}
                      </div>

                      <div className="absolute top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40">
                        <div className=" text-white text-2xl font-medium">
                          <h1 className="uppercase font-light text-3xl">
                            {category?.name}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </>
            )}
        </div>
        <div className="flex flex-col mt-5 w-[95%] mx-auto gap-3">
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
        <div className="mt-auto border-t border-t-[#e5e7eb] w-[95%] mx-auto py-3 flex items-center justify-between">
          <div>
            <Image src={User} width={30} height={30} />
          </div>
          <div>
            <Link href="/korpa">
              {" "}
              <Image src={Cart} width={35} height={35} />
            </Link>
          </div>
          <div>
            <Link href="/lista-zelja">
              {" "}
              <Image src={Wishlist} width={25} height={25} />
            </Link>
          </div>
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
