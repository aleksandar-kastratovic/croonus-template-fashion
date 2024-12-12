"use client";
import React, { Suspense, useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Measure from "../../assets/Icons/measure.png";
// import info from "../../assets/Icons/info.png";
import { notFound } from "next/navigation";
import Link from "next/link";
import { get, post } from "@/api/api";
import { useCartContext } from "@/api/cartContext";
import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/ecommerce.hooks";
import { useSuspenseQuery } from "@tanstack/react-query";

import Variants from "@/components/Variants/Variants";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { Table } from "@/components/ProductDetails/Table";
import { Breadcrumbs } from "@/components/ProductDetails/InfoData/breadcrumbs";
import { BasicData } from "@/components/ProductDetails/InfoData/basic-data";
import { Wishlist } from "@/components/ProductDetails/InfoData/wishlist";
import { Specifications } from "@/components/ProductDetails/InfoData/specifications";

import { checkIsInStock, checkPrices } from "./prices/functions";

export const ProductInfo = ({
  id,
  path,
  canonical,
  base_url,
  setColor = () => {},
}) => {
  const [product, setProduct] = useState();
  const [productVariant, setProductVariant] = useState(null);
  const [tempError, setTempError] = useState(null);

  const [count, setCount] = useState(1);

  const router = useRouter();

  const { mutate: addToCart, isPending } = useAddToCart();
  const [, , , mutateWishList] = useCartContext();

  const checkIsAddable = (price, inventory) => {
    let addable_data = {};

    let is_in_stock = checkIsInStock(inventory);
    let { price_defined } = checkPrices(price);
    if (is_in_stock && price_defined) {
      addable_data.addable = true;
      addable_data.text = "DODAJ U KORPU";
    } else {
      addable_data.addable = false;
      addable_data.text = "POŠALJI UPIT";
    }

    return addable_data;
  };

  //hendlujemo dodavanje u korpu
  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single":
        let is_addable = checkIsAddable(
          product?.data?.item?.price,
          product?.data?.item?.inventory
        );
        if (is_addable?.addable) {
          addToCart({
            id: product?.data?.item?.basic_data?.id_product,
            quantity: count,
          });
          // pushToDataLayer("add_to_cart", product?.data?.item, count);
        } else {
          router.push(`/kontakt?slug=${product?.data?.item?.slug}`);
        }
        break;
      case "variant":
        if (productVariant?.id) {
          let is_addable = checkIsAddable(
            productVariant?.price,
            productVariant?.inventory
          );

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: count,
            });
            // pushToDataLayer("add_to_cart", productVariant, count);
          } else {
            router.push(`/kontakt?slug=${productVariant?.slug}`);
          }
        } else {
          let text = checkSelectedOptions(selectedOptions);
          setTempError(text);
        }
        break;
      default:
        break;
    }
  };

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (deliveryModal || infoModal || returnModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleBodyScroll();
  }, [deliveryModal, infoModal, returnModal]);

  const [text, setText] = useState("Dodaj u korpu");
  const [text2, setText2] = useState("Kupi odmah");

  // const isVariantSelected = () => {
  //   console.log(productVariant);
  //   switch (true) {
  //     case product?.product_type === "variant" && !productVariant?.id && !color:
  //       setText("Izaberite boju");
  //       setText2("Izaberite boju");
  //       return false;
  //     case product?.product_type === "variant" &&
  //       !productVariant?.id &&
  //       color !== "":
  //       setText("Izaberite veličinu");
  //       setText2("Izaberite veličinu");
  //       return false;
  //     case product?.product_type === "variant" && productVariant?.id:
  //       setText("Dodaj u korpu");
  //       setText2("Kupi odmah");
  //   }
  //   return true;
  // };

  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodaj u korpu");
      setText2("Kupi odmah");
    }
  }, [productVariant]);

  const [type, setType] = useState();

  return (
    <>
      <>
        <div className="max-lg:col-span-4 mt-[2rem] lg:col-span-2 ">
          <div className={`lg:hidden`}>
            <Suspense
              fallback={
                <div className={`h-2 bg-slate-300 animate-pulse w-full`} />
              }
            >
              <Breadcrumbs id={id} path={path} base_url={base_url} />
            </Suspense>
          </div>
          <div className="flex mt-3 flex-col ">
            <Suspense
              fallback={
                <div className={`mt-5`}>
                  <div
                    className={`w-full h-5 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-10 h-2 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-10 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                  <div
                    className={`w-full mt-5 h-5 bg-slate-300 animate-pulse`}
                  ></div>
                </div>
              }
            >
              <BasicData
                productVariant={productVariant}
                path={path}
                id={id}
                canonical={canonical}
                setType={setType}
                setProduct={setProduct}
                setProductVariant={setProductVariant}
              />
            </Suspense>
          </div>

          {/*<div className="flex items-center gap-2">*/}
          {/*  <Image src={Measure} alt="measure" width={30} height={20} />*/}
          {/*  <span className="text-[13px] font-bold">Pomoć za veličine</span>*/}
          {/*</div>*/}
          <div className="max-md:mt-[2rem] mt-[1rem] max-md:flex max-md:items-center max-md:w-full">
            <ul className="flex flex-row gap-[47px] text-[13px] relative separate">
              <div
                className="relative cursor-pointer font-bold"
                onClick={() => setInfoModal(true)}
              >
                Pomoć za veličine
              </div>

              {/*<div*/}
              {/*  className="relative cursor-pointer"*/}
              {/*  onClick={() => setReturnModal(true)}*/}
              {/*>*/}
              {/*  Povraćaj*/}
              {/*</div>*/}
            </ul>
          </div>
          <div className="mt-[1.6rem] max-md:mt-[1rem] flex items-center gap-3">
            <button
              disabled={isPending}
              className={
                productVariant === null || productVariant.length === 0
                  ? `max-sm:w-[8.5rem] ${
                      text === "Izaberite veličinu"
                        ? `bg-red-500`
                        : `bg-[#2bc48a]`
                    } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold  relative`
                  : `max-sm:w-[8.5rem] ${
                      text === "Izaberite veličinu"
                        ? `bg-red-500`
                        : `bg-[#2bc48a]`
                    } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold`
              }
              onClick={() => {
                // if (isVariantSelected()) {
                handleAddToCart();
                // }
              }}
            >
              {isPending
                ? "DODAJEM..."
                : tempError
                ? tempError
                : checkIsAddable(
                    productVariant?.id
                      ? productVariant?.price
                      : product?.data?.item?.price,
                    productVariant?.id
                      ? productVariant?.inventory
                      : product?.data?.item?.inventory
                  )?.text}
            </button>
            {checkIsAddable(
              productVariant?.id
                ? productVariant?.price
                : product?.data?.item?.price,
              productVariant?.id
                ? productVariant?.inventory
                : product?.data?.item?.inventory
            )?.addable && (
              <button
                className={
                  productVariant === null || productVariant.length === 0
                    ? `max-sm:w-[8.5rem] ${
                        text2 === "Izaberite veličinu"
                          ? `bg-red-500`
                          : `bg-[#191919]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold  relative`
                    : `max-sm:w-[8.5rem] ${
                        text2 === "Izaberite veličinu"
                          ? `bg-red-500`
                          : `bg-[#191919]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold`
                }
                onClick={() => {
                  // if (isVariantSelected()) {
                  handleAddToCart();
                  router.push("/korpa");
                  // }
                }}
              >
                {text2}
              </button>
            )}

            <Suspense
              fallback={
                <div className={`w-10 h-10 bg-slate-300 animate-pulse`} />
              }
            >
              <Wishlist product={product} />
            </Suspense>
          </div>
          <div className="md:hidden mt-5 flex items-center gap-[10px] justify-between py-5 ">
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/package.png"}
                alt="free delivery"
                width={30}
                height={30}
              />
              <p className="text-sm regular">Besplatna dostava</p>
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/calendar.png"}
                alt="free delivery"
                width={30}
                height={30}
                className="w-7 h-auto"
              />
              <p className="text-sm regular">2 dana isporuka</p>
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/delivery-status.png"}
                alt="free delivery"
                width={30}
                height={30}
              />
              <p className="text-sm regular">Povrat do 14 dana</p>
            </div>
          </div>
          <Specifications id={id} />
          <div className="max-md:hidden fixed z-[100] max-w-[114px] right-0 top-[30%] flex flex-col gap-[30px] px-5 py-[37px] bg-white drop-shadow-2xl rounded-l-lg">
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/package.png"}
                alt="free delivery"
                width={50}
                height={50}
              />
              <p className="text-sm regular">Besplatna dostava</p>
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/calendar.png"}
                alt="free delivery"
                width={47}
                height={42}
                className="w-11 h-auto"
              />
              <p className="text-sm regular">2 dana isporuka</p>
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <Image
                src={"/icons/delivery-status.png"}
                alt="free delivery"
                width={46}
                height={46}
              />
              <p className="text-sm regular">Povrat do 14 dana</p>
            </div>
          </div>
        </div>

        {(deliveryModal || infoModal || returnModal) && (
          <div
            className="fixed z-[100] bg-black bg-opacity-40 top-0 left-0 w-screen h-screen transition-all duration-500"
            onClick={() => {
              setDeliveryModal(false);
              setInfoModal(false);
              setReturnModal(false);
            }}
          ></div>
        )}
        <Table openModal={infoModal} setOpenModal={setInfoModal} />
      </>
    </>
  );
};
