"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Wishlist from "../../assets/Icons/heart.png";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
import { get, list, post } from "@/app/api/api";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { useCartContext } from "@/app/api/cartContext";

const Thumb = ({ data, slider, productsPerViewMobile }) => {
  const [, , wishlist, mutateWishList] = useCartContext();

  const addToWishlist = async (id, name) => {
    await post("/wishlist", {
      id: null,
      id_product: id,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((response) => {
      mutateWishList();
      if (response?.code === 200) {
        toast.success(`Proizvod ${name} uspešno dodat u listu želja`, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.warn("Proizvod je već dodat u listu želja!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    });
  };
  const [allFromWishlist, setAllFromWishlist] = useState([]);
  useEffect(() => {
    const getAllFromWishlist = async () => {
      return await list(`/wishlist`).then((response) => {
        setAllFromWishlist(response?.payload?.items);
      });
    };
    getAllFromWishlist();
  }, [wishlist]);

  const [swiper, setSwiper] = useState(null);
  const [loading, setLoading] = useState({
    id: null,
    status: false,
  });
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const [productVariant, setProductVariant] = useState(null);
  const [selected, setSelected] = useState([]);
  const [idProduct, setIdProduct] = useState(null);
  const [navigationEnabled, setNavigationEnabled] = useState({
    enabled: false,
    id: null,
  });
  // useEffect(() => {
  //   const setVariantColorOption = (data) => {
  //     const selectedOptions = new Set();
  //
  //     data?.forEach((item) => {
  //       item?.variant_options?.forEach((item2) => {
  //         if (item2?.attribute?.slug === "color") {
  //           selectedOptions.clear(); // Clear existing selections
  //           selectedOptions.add(
  //             JSON.stringify({
  //               attribute_key: item2?.attribute?.key,
  //               value_key: item2?.values[0]?.key,
  //             })
  //           );
  //         }
  //       });
  //     });
  //
  //     setSelected(Array.from(selectedOptions, (option) => JSON.parse(option)));
  //   };
  //
  //   setVariantColorOption(data);
  // }, []);

  useEffect(() => {
    if (selected?.length === 2) {
      setLoading({
        id: idProduct,
        status: true,
      });
      const getVariant = async (selected) => {
        const res = await get(`/product-details/basic-data/${idProduct}`);
        if (
          res?.payload?.data?.variant_items &&
          res?.code === 200 &&
          selected?.length === 2
        ) {
          const variantItems = res?.payload?.data?.variant_items;
          const variant = variantItems?.find((item) =>
            item?.variant_key_array?.every((variantKey) =>
              selected?.some(
                (selection) =>
                  selection?.attribute_key === variantKey?.attribute_key &&
                  selection?.value_key === variantKey?.value_key
              )
            )
          );
          !variant?.basic_data?.name
            ? toast.error(`Došlo je do greške, molimo Vas pokušajte ponovo.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              })
            : toast.success(
                `Proizvod ${variant?.basic_data?.name} je dodat u korpu`,
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                }
              );
          addToCart(variant?.basic_data?.id_product, 1);
          setSelected([]);
          setIdProduct(null);
          setLoading({
            id: null,
            status: false,
          });
          return variant;
        }
      };
      getVariant(selected);
    }
  }, [selected, idProduct]);

  const products = (data ?? []).map((product, index) => {
    const variantOptionSize = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "velicina";
    });
    const variantOptionColor = product?.variant_options?.find((variant) => {
      return variant?.attribute?.slug === "boja";
    });

    const isInWishlist = (allFromWishlist ?? [])?.find((item) => {
      return item?.wishlist?.id_product === product?.basic_data?.id_product;
    });

    return (
      <SwiperSlide key={product?.basic_data?.id} className="hoveredColor">
        <div
          className="w-full item"
          onMouseEnter={() =>
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            })
          }
          onMouseLeave={() =>
            setNavigationEnabled({
              enabled: false,
              id: null,
            })
          }
        >
          {" "}
          <div className="max-md:h-[250px] md:h-[450px] lg:h-[450px] 2xl:h-[500px] item relative hoveredColor">
            <Swiper
              modules={[Navigation, Pagination]}
              // onSwiper={(swiper) => setSwiper(swiper)}
              pagination={true}
              direction={"vertical"}
              loop={true}
              navigation={
                navigationEnabled.enabled === true &&
                navigationEnabled.id === product?.basic_data?.id_product
              }
              breakpoints={{
                320: {
                  navigation: {
                    enabled: false,
                  },
                },
                1024: {
                  navigation: {
                    enabled: true,
                  },
                  pagination: {
                    enabled: false,
                  },
                  direction: "horizontal",
                },
              }}
              className={`categoryImageSwiper relative`}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {product?.image?.map((image, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/proizvod/${product?.slug}`}
                    scroll={true}
                    className="z-[100]"
                  >
                    {image && (
                      <Image
                        src={convertHttpToHttps(image)}
                        alt={product?.basic_data?.name}
                        width={0}
                        height={0}
                        sizes={
                          "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        }
                        priority
                        className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                      />
                    )}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {product?.price?.discount?.active && (
              <div
                className={`absolute left-2 top-2 z-[1] text-white text-[13px]`}
              >
                <div
                  className={`bg-[#c23d27] px-[0.85rem] py-1 rounded-lg font-bold`}
                >
                  -
                  {(
                    ((product?.price?.price?.original -
                      product?.price?.price?.discount) /
                      product?.price?.price?.original) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              </div>
            )}
            {product?.stickers?.length > 0 && (
              <div
                className={`absolute right-2 top-2 z-[1] text-center text-white text-[13px] flex flex-col gap-2`}
              >
                {product?.stickers?.map((sticker) => {
                  return (
                    <div
                      className={`text-[13px] bg-[#39ae00] px-[0.85rem] py-1 rounded-lg font-bold`}
                    >
                      {sticker?.name}
                    </div>
                  );
                })}
              </div>
            )}
            {product?.variant_options?.length > 0 ? (
              <div className="absolute z-[100] py-2 left-0 bottom-0 w-full mx-auto bg-white chevrons opacity-90">
                <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                  {/* <h1 className="text-[0.938rem] font-semibold text-center">
                    Izaberi veličinu
                  </h1> */}
                  <div className="flex flex-row items-center justify-center gap-3  mt-2 w-full">
                    <Swiper
                      slidesPerView={3}
                      breakpoints={{
                        640: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1300: {
                          slidesPerView: 4,
                        },
                        1680: {
                          slidesPerView: 5,
                        },
                      }}
                      className="variantsSwiper"
                      loop={true}
                      rewind={true}
                      dir={"ltr"}
                      modules={[Navigation]}
                      navigation={
                        variantOptionSize?.values?.length >
                        swiper?.params?.slidesPerView
                      }
                      style={{ width: "100%", display: "block" }}
                      onSwiper={(swiper) => {
                        setSwiper(swiper);
                      }}
                    >
                      {variantOptionSize?.values?.map((item3) => {
                        const variantAttributeKey =
                          variantOptionSize?.attribute?.key;
                        const isSelected = selected?.find(
                          (selection) =>
                            selection?.attribute_key === variantAttributeKey &&
                            selection?.value_key === item3?.key
                        );
                        return (
                          <SwiperSlide key={Math.random()}>
                            <div
                              className={`max-sm:scale-[0.8] rounded-full mx-auto cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border ${
                                isSelected &&
                                variantAttributeKey === variantAttributeKey
                                  ? `border-[#242424] bg-[#242424] text-white`
                                  : ``
                              }`}
                              onClick={() => {
                                if (product?.variant_options?.length > 1) {
                                  setSelected((prevSelected) => {
                                    const filteredSelections =
                                      prevSelected?.filter(
                                        (selection) =>
                                          selection?.attribute_key !==
                                          variantAttributeKey
                                      );

                                    return [
                                      ...filteredSelections,
                                      {
                                        attribute_key: variantAttributeKey,
                                        value_key: item3?.key,
                                      },
                                    ];
                                  });
                                  setIdProduct(product?.basic_data?.id_product);
                                } else {
                                  const productVariantGet = async () => {
                                    const res = await get(
                                      `/product-details/basic-data/${product?.basic_data?.id_product}`
                                    );
                                    const data = res?.payload?.data;
                                    if (data?.variant_items) {
                                      const clickedVariant =
                                        data?.variant_items?.find(
                                          (variantItem) => {
                                            return variantItem?.variant_key_array?.some(
                                              (variantKey) => {
                                                return (
                                                  variantKey?.value_key ===
                                                  item3.key
                                                );
                                              }
                                            );
                                          }
                                        );
                                      setProductVariant(
                                        clickedVariant?.basic_data?.id_product
                                      );
                                      addToCart(
                                        clickedVariant?.basic_data?.id_product,
                                        1,
                                        false
                                      );
                                      toast.success(
                                        `Proizvod ${clickedVariant.basic_data.name} je dodat u korpu!`,
                                        {
                                          position: "top-center",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                    }
                                  };
                                  productVariantGet();
                                }
                              }}
                            >
                              {item3?.name}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    <p onClick={() => onSwiperRightClick()}>&nbsp;</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="mt-[0.813rem] max-md:text-left  flex max-md:items-start items-center justify-between relative z-[50]">
            <Link
              href={`/proizvod/${product?.slug}`}
              scroll={true}
              className="relative z-[5]"
            >
              <h1 className="max-md:text-[0.85] text-[0.813rem]  max-md:leading-4">
                {product?.basic_data?.name}
              </h1>
            </Link>
            <div
              onClick={() => {
                addToWishlist(
                  product?.basic_data?.id_product,
                  product?.basic_data?.name
                );
              }}
              className={`hover:bg-red-500 ${
                isInWishlist && "bg-red-500"
              } max-md:hidden rounded-full p-1 favorites cursor-pointer`}
            >
              <Image
                src={Wishlist}
                alt="wishlist"
                width={15}
                height={15}
                className={`favorite ${isInWishlist && "favorited"}`}
              />
            </div>
          </div>
          <div className=" flex items-center gap-1 flex-wrap max-md:text-[0.75rem] text-[0.813rem]  min-w-[5.938rem] max-w-max">
            <div className={`bg-[#f8ce5d] mt-3 px-2 font-bold text-center`}>
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
            </div>
            {product?.price?.discount?.active && (
              <span className={`line-through mt-3`}>
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>
          <div className={` w-full`}>
            <div
              className={`flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem] mt-2 color`}
            >
              {loading?.status &&
              loading?.id === product?.basic_data?.id_product ? (
                <i
                  className={`fa fa-solid fa-spinner animate-spin text-xl`}
                ></i>
              ) : (
                <>
                  {variantOptionColor?.values?.map((item3) => {
                    const variantAttributeKey =
                      variantOptionColor?.attribute?.key;
                    const isSelected = selected.find(
                      (item) =>
                        item?.attribute_key === variantAttributeKey &&
                        item?.value_key === item3?.key
                    );

                    return (
                      <div
                        key={item3?.key}
                        className={`max-sm:scale-[0.8] ${
                          isSelected ? `border border-[#242424] p-[0.5px]` : ``
                        } rounded-full  cursor-pointer flex items-center justify-center text-center text-xs w-[9px] md:w-[15px] h-[9px] md:h-[15px] border hover:border-[#242424] transition-all relative duration-500`}
                        onClick={() => {
                          setSelected((prevSelected) => {
                            // Remove previous selections with the same variantAttributeKey
                            const filteredSelections = prevSelected.filter(
                              (selection) =>
                                selection.attribute_key !== variantAttributeKey
                            );
                            return [
                              ...filteredSelections,
                              {
                                attribute_key: variantAttributeKey,
                                value_key: item3?.key,
                              },
                            ];
                          });
                          setIdProduct(product?.basic_data?.id_product);
                        }}
                      >
                        {item3?.image && (
                          <Image
                            src={item3?.image}
                            alt=""
                            className="rounded-full"
                            fill
                            sizes={
                              "(max-width: 639px) 15px, (max-width: 767px) 15px, (max-width: 1023px) 15px, (max-width: 1279px) 15px, 15px"
                            }
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {variantOptionColor?.values?.length > 1 && (
              <div className={`text-[0.75rem] text-left mt-1 hoveredColor1`}>
                + {variantOptionColor?.values?.length - 1}{" "}
                {variantOptionColor?.values?.length - 1 === 1
                  ? "boja"
                  : variantOptionColor?.values?.length - 1 >= 2 &&
                    variantOptionColor?.values?.length - 1 <= 4
                  ? "boje"
                  : "boja"}
              </div>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });

  const addToCart = useGlobalAddToCart();
  if (slider) {
    return (
      <>
        <ToastContainer />
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="mySwiper3 w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  } else {
    const [productVariant, setProductVariant] = useState(null);
    const addToCart = useGlobalAddToCart();
    const [initialSlide, setInitialSlide] = useState(0);
    const [image, setImage] = useState({
      image: null,
      id: null,
    });

    useEffect(() => {
      if (image) {
        const imagesArray = data?.map((item) => {
          return item?.image;
        });
      }
    }, [image]);

    const products = data?.map((product, index) => {
      const variantOptionSize = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "velicina";
      });
      const variantOptionColor = product?.variant_options?.find((variant) => {
        return variant?.attribute?.slug === "boja";
      });

      const isInWishlist = (allFromWishlist ?? [])?.find((item) => {
        return item?.wishlist?.id_product === product?.basic_data?.id_product;
      });

      return (
        <div
          className="col-span-1 relative item hoveredColor"
          onMouseEnter={() => {
            setNavigationEnabled({
              enabled: true,
              id: product?.basic_data?.id_product,
            });
          }}
        >
          <div
            className={`max-md:h-[250px] ${
              productsPerViewMobile === 1 && "!h-[500px]"
            } md:h-[450px] lg:h-[450px] xl:h-[470px] 2xl:h-[500px] 3xl:h-[575px] item relative`}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              // onSwiper={(swiper) => setSwiper(swiper)}
              pagination={true}
              direction={"horizontal"}
              loop={true}
              initialSlide={product?.image?.findIndex(
                (item) => item === product?.image[0]
              )}
              navigation={
                navigationEnabled.enabled === true &&
                navigationEnabled.id === product?.basic_data?.id_product
              }
              breakpoints={{
                320: {
                  navigation: {
                    enabled: false,
                  },
                },
                1024: {
                  navigation: {
                    enabled: true,
                  },
                  pagination: {
                    enabled: false,
                  },
                  direction: "horizontal",
                },
              }}
              className={`categoryImageSwiper relative`}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {product?.image?.map((item, index) => {
                return (
                  <SwiperSlide>
                    <Link href={`/proizvod/${product?.slug}`} className="z-50">
                      <Image
                        src={convertHttpToHttps(
                          image?.id === product?.basic_data?.id_product
                            ? image?.image
                            : item
                        )}
                        alt={product?.basic_data?.name}
                        sizes={
                          "(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                        }
                        width={0}
                        height={0}
                        priority={true}
                        className={`transition-all duration-200 opacity-100 object-fill w-full h-full`}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {product?.price?.discount?.active && (
              <div
                className={`absolute left-2 top-2 z-[1] text-white text-[13px]`}
              >
                <div
                  className={`bg-[#c23d27] px-[0.85rem] py-1 rounded-lg font-bold`}
                >
                  -
                  {(
                    ((product?.price?.price?.original -
                      product?.price?.price?.discount) /
                      product?.price?.price?.original) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              </div>
            )}
            {product?.stickers?.length > 0 && (
              <div
                className={`absolute right-2 top-2 z-[1] text-center text-white text-[13px] flex flex-col gap-2`}
              >
                {product?.stickers?.map((sticker) => {
                  return (
                    <div
                      className={`text-[13px] bg-[#39ae00] px-[0.85rem] py-1 rounded-lg font-bold`}
                    >
                      {sticker?.name}
                    </div>
                  );
                })}
              </div>
            )}
            {product?.variant_options?.length > 0 ? (
              <div className="absolute z-[100] py-2 left-0 bottom-0 w-full mx-auto bg-white chevrons opacity-90">
                <div className="flex flex-col items-center justify-center w-[80%] mx-auto">
                  {/* <h1 className="text-[0.938rem] font-semibold text-center">
                    Izaberi veličinu
                  </h1> */}
                  <div className="flex flex-row items-center justify-center gap-3  mt-2 w-full">
                    <Swiper
                      slidesPerView={3}
                      breakpoints={{
                        640: {
                          slidesPerView: 3,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1300: {
                          slidesPerView: 4,
                        },
                        1680: {
                          slidesPerView: 5,
                        },
                      }}
                      className="variantsSwiper"
                      loop={true}
                      rewind={true}
                      dir={"ltr"}
                      modules={[Navigation]}
                      navigation={
                        variantOptionSize?.values?.length >
                        swiper?.params?.slidesPerView
                      }
                      style={{ width: "100%", display: "block" }}
                      onSwiper={(swiper) => {
                        setSwiper(swiper);
                      }}
                    >
                      {variantOptionSize?.values?.map((item3) => {
                        const variantAttributeKey =
                          variantOptionSize?.attribute?.key;
                        const isSelected = selected?.find(
                          (selection) =>
                            selection?.attribute_key === variantAttributeKey &&
                            selection?.value_key === item3?.key
                        );
                        return (
                          <SwiperSlide key={Math.random()}>
                            <div
                              className={`max-sm:scale-[0.8] rounded-full mx-auto cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border ${
                                isSelected &&
                                variantAttributeKey === variantAttributeKey
                                  ? `border-[#242424] bg-[#242424] text-white`
                                  : ``
                              }`}
                              onClick={() => {
                                if (product?.variant_options?.length > 1) {
                                  setSelected((prevSelected) => {
                                    const filteredSelections =
                                      prevSelected?.filter(
                                        (selection) =>
                                          selection?.attribute_key !==
                                          variantAttributeKey
                                      );

                                    return [
                                      ...filteredSelections,
                                      {
                                        attribute_key: variantAttributeKey,
                                        value_key: item3?.key,
                                      },
                                    ];
                                  });
                                  setIdProduct(product?.basic_data?.id_product);
                                } else {
                                  const productVariantGet = async () => {
                                    const res = await get(
                                      `/product-details/basic-data/${product?.basic_data?.id_product}`
                                    );
                                    const data = res?.payload?.data;
                                    if (data?.variant_items) {
                                      const clickedVariant =
                                        data?.variant_items?.find(
                                          (variantItem) => {
                                            return variantItem?.variant_key_array?.some(
                                              (variantKey) => {
                                                return (
                                                  variantKey?.value_key ===
                                                  item3.key
                                                );
                                              }
                                            );
                                          }
                                        );
                                      setProductVariant(
                                        clickedVariant?.basic_data?.id_product
                                      );
                                      addToCart(
                                        clickedVariant?.basic_data?.id_product,
                                        1,
                                        false
                                      );
                                      toast.success(
                                        `Proizvod ${clickedVariant.basic_data.name} je dodat u korpu!`,
                                        {
                                          position: "top-center",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                        }
                                      );
                                    }
                                  };
                                  productVariantGet();
                                }
                              }}
                            >
                              {item3?.name}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    <p onClick={() => onSwiperRightClick()}>&nbsp;</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/*<div className="absolute bottom-2 left-4">*/}
          {/*  <span className="text-[0.75rem] max-md:text-[0.65rem] text-black bg-white px-3.5 font-bold py-1 rounded-md">*/}
          {/*    -35%*/}
          {/*  </span>*/}
          {/*</div>*/}
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
          <div className="mt-[0.813rem] flex items-center justify-between relative z-[50]">
            <Link
              href={`/proizvod/${product?.slug}`}
              className="max-md:text-[0.85] text-[0.813rem] relative max-md:leading-4 max-sm:line-clamp-1"
            >
              {product?.basic_data?.name}
            </Link>
            <div
              onClick={() => {
                addToWishlist(
                  product?.basic_data?.id_product,
                  product?.basic_data?.name
                );
              }}
              className={`hover:bg-red-500 ${
                isInWishlist && "bg-red-500"
              } max-md:hidden rounded-full p-1 favorites cursor-pointer`}
            >
              <Image
                src={Wishlist}
                alt="wishlist"
                width={15}
                height={15}
                className={`favorite ${isInWishlist && "favorited"}`}
              />
            </div>
          </div>
          <div className=" flex items-center gap-1 mt-2 flex-wrap max-md:text-[0.75rem] text-[0.813rem]  min-w-[5.938rem] max-w-max">
            <div className={`bg-[#f8ce5d] px-2 md:mt-3 font-bold text-center`}>
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
            </div>
            {product?.price?.discount?.active && (
              <span className={`line-through md:mt-3`}>
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>{" "}
          <div className={`absolute bottom-[-20px] w-full`}>
            <div
              className={`flex flex-row items-start gap-[0.05rem] md:gap-[0.35rem] mt-2 color`}
            >
              {loading?.status &&
              loading?.id === product?.basic_data?.id_product ? (
                <i
                  className={`fa fa-solid fa-spinner animate-spin text-xl`}
                ></i>
              ) : (
                <>
                  {variantOptionColor?.values?.map((item3) => {
                    const variantAttributeKey =
                      variantOptionColor?.attribute?.key;
                    const isSelected = selected.find(
                      (item) =>
                        item?.attribute_key === variantAttributeKey &&
                        item?.value_key === item3?.key
                    );

                    return (
                      <div
                        key={item3?.key}
                        className={`max-sm:scale-[0.8] ${
                          isSelected ? `border border-[#242424] p-[0.5px]` : ``
                        } rounded-full  cursor-pointer flex items-center justify-center text-center text-xs w-[9px] md:w-[15px] h-[9px] md:h-[15px] border hover:border-[#242424] transition-all relative duration-500`}
                        onClick={() => {
                          setSelected((prevSelected) => {
                            // Remove previous selections with the same variantAttributeKey
                            const filteredSelections = prevSelected.filter(
                              (selection) =>
                                selection.attribute_key !== variantAttributeKey
                            );
                            return [
                              ...filteredSelections,
                              {
                                attribute_key: variantAttributeKey,
                                value_key: item3?.key,
                              },
                            ];
                          });
                          setIdProduct(product?.basic_data?.id_product);
                        }}
                      >
                        {item3?.image && (
                          <Image
                            src={item3?.image}
                            alt=""
                            className="rounded-full"
                            fill
                            sizes={
                              "(max-width: 639px) 15px, (max-width: 767px) 15px, (max-width: 1023px) 15px, (max-width: 1279px) 15px, 15px"
                            }
                            style={{ objectFit: "cover" }}
                          />
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {variantOptionColor?.values?.length > 1 && (
              <div className={`text-[0.75rem] text-left mt-1 hoveredColor1`}>
                + {variantOptionColor?.values?.length - 1}{" "}
                {variantOptionColor?.values?.length - 1 === 1
                  ? "boja"
                  : variantOptionColor?.values?.length - 1 >= 2 &&
                    variantOptionColor?.values?.length - 1 <= 4
                  ? "boje"
                  : "boja"}
              </div>
            )}
          </div>
        </div>
      );
    });
    return (
      <>
        {products}
        <ToastContainer />
      </>
    );
  }
};

export default Thumb;
