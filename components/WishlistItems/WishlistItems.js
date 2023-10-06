"use client";
import { useGlobalRemoveFromWishlist } from "@/app/api/globals";
import Link from "next/link";
import Image from "next/image";
import { currencyFormat } from "@/helpers/functions";
import { useState, useCallback, useEffect } from "react";
import Heart from "../../assets/Icons/heart.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import { toast, ToastContainer } from "react-toastify";
import { useCartContext } from "@/app/api/cartContext";
import { useGlobalAddToCart } from "@/app/api/globals";
import { get, list, deleteMethod as DELETE } from "@/app/api/api";
import CartProductBox from "../CartProductBox";
import ProductPrice from "@/components/ProductPrice/ProductPrice";

const WishlistItems = ({ items, product, border }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();
  const globalAddToCart = useGlobalAddToCart();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cart, , wishList] = useCartContext();
  const [stickerHovered, setStickerHovered] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState([]);
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

  useEffect(() => {
    const getCart = async () => {
      const cartResponse = await list("/cart").then((response) =>
        setCartData(response?.payload?.items)
      );
    };
    getCart();
  }, [cart]);
  const isStickerHovered = stickerHovered === product?.id;
  const [, , , mutateWishList] = useCartContext();

  const removeFromWishlist = async (id, name) => {
    return DELETE(`/wishlist/${id}`).then((response) => {
      if (response?.code === 200) {
        toast.success(`Proizvod ${name} je uspešno uklonjen iz liste želja!`, {
          position: "top-center",
          autoClose: 2000,
        });
        mutateWishList();
      } else {
        toast.error("Došlo je do greške!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };

  return (
    <>
      <div className="col-span-1 relative item mt-[2rem] lg:mt-[9rem]">
        <div className="max-md:h-[250px] md:h-[450px] lg:h-[500px] 2xl:h-[575px] item relative">
          {product?.image[0] && (
            <Link href={`/proizvod/${product?.slug}`} scroll={true}>
              <Image
                src={product?.image[0]}
                alt={product?.basic_data?.name}
                fill={true}
                style={{ objectFit: "cover" }}
                priority={true}
                className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
              />
            </Link>
          )}

          {/*<div className="absolute bottom-2 left-4">*/}
          {/*  <span className="text-[0.75rem] text-black bg-white px-3.5 font-bold py-1 rounded-md">*/}
          {/*    -35%*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
        {/* <div className="absolute  px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
            <div>
              <Image
                className="cursor-pointer rotate-180"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === 0) {
                    setImageIndex(product?.image.length - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              />
            </div>
            <div>
              <Image
                className="cursor-pointer rotate-0"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === product?.image.length - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              />
            </div>
          </div> */}
        {/*{product?.variant_options?.length > 0 ? (*/}
        {/*  <div className="absolute rounded-lg py-5 left-3 bottom-[4.5rem] w-[95%] mx-auto bg-white chevrons">*/}
        {/*    <div className="flex flex-col items-center justify-center w-full">*/}
        {/*      <h1 className="text-[0.938rem] font-semibold text-center">*/}
        {/*        Izaberi veličinu*/}
        {/*      </h1>*/}
        {/*      <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">*/}
        {/*        <>*/}
        {/*          {product?.variant_options?.slice(0, 1).map((item2) => {*/}
        {/*            return (*/}
        {/*              <>*/}
        {/*                {item2?.values.map((item3) => {*/}
        {/*                  return (*/}
        {/*                    <>*/}
        {/*                      <div className="rounded-full cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">*/}
        {/*                        {item3?.name}*/}
        {/*                      </div>*/}
        {/*                    </>*/}
        {/*                  );*/}
        {/*                })}*/}
        {/*              </>*/}
        {/*            );*/}
        {/*          })}*/}
        {/*        </>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*) : null}*/}
        <div className="mt-[0.813rem] flex items-center justify-between relative z-[50]">
          <h1 className="text-[0.813rem] clamp">{product?.basic_data?.name}</h1>
          <div
            onClick={() => {
              removeFromWishlist(items, product?.basic_data?.name);
            }}
            className=" p-1 favorites"
          >
            <i className="fa-solid fa-times text-lg cursor-pointer hover:text-red-500" />
          </div>
        </div>
        <div className=" flex items-center gap-1 flex-wrap max-md:text-[0.75rem] text-[0.813rem]  min-w-[5.938rem] max-w-max">
          <div className={`bg-[#f8ce5d] px-2 font-bold text-center`}>
            <ProductPrice
              price={product?.price}
              inventory={product?.inventory}
            />
          </div>
          {product?.price?.discount?.active && (
            <span className={`line-through`}>
              {currencyFormat(product?.price?.price?.original)}
            </span>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default WishlistItems;
