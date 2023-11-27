"use client";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "../../assets/Icons/heart.png";
import WishlistActive from "../../assets/Icons/heart-active.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import CampaignsDetails from "./CampaignsDetails";
import DeliveryModal from "./DeliveryModal";
import InfoModal from "./InfoModal";
import ReturnModal from "./ReturnModal";
import { get, post } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";

const ProductInfo = ({
  product,
  desc,
  path,
  isNewURL,
  setIsNewURL,
  setVariantKey,
  variantKey,
  setColor,
  breadcrumbs,
  specification,
  declaration,
  color,
}) => {
  const [productVariant, setProductVariant] = useState(null);
  const campaignsDate =
    product?.data?.item?.price?.discount?.campaigns[0]?.duration;

  const router = useRouter();
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [newURL, setNewURL] = useState(null);
  useEffect(() => {
    if (newURL) {
      window?.history?.replaceState(null, null, newURL);
    }
  }, [newURL]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };
  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (selectedColor !== null) {
      setColor(selectedColor);
    }
  }, [selectedColor]);
  const [, , , mutateWishList] = useCartContext();

  const [productAmount, setProductAmount] = useState(1);
  const globalAddToCart = useGlobalAddToCart();
  const globalAddToWishList = useGlobalAddToWishList();
  const [setVariant, setVariantOnOff] = useState(true);
  const addToWishlist = async () => {
    await post(`/wishlist`, {
      id: null,
      id_product: product?.data?.item?.basic_data?.id_product,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((res) => {
      mutateWishList();
      if (res?.code === 200) {
        toast.success("Proizvod dodat u listu želja!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Došlo je do nepoznate greške!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const getIsInWishlist = async () => {
      return await get(
        `/wishlist/product-in-wishlist/${product?.data?.item?.basic_data?.id_product}`
      ).then((res) => {
        setIsInWishlist(res?.payload?.exist);
      });
    };

    getIsInWishlist();
  }, [addToWishlist, product]);

  const addToCart = (e) => {
    if (product.product_type === "single") {
      globalAddToCart(product.data.item.basic_data.id_product, 1);
      toast.success(
        `Proizvod ${product.data.item.basic_data?.name} dodat u korpu!`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    } else {
      if (productVariant) {
        globalAddToCart(productVariant?.basic_data?.id_product, 1);
        toast.success(
          `Proizvod ${productVariant?.basic_data?.name} dodat u korpu!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
    setProductAmount(1);
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

  const handleTextChangeAddToCart = () => {
    switch (true) {
      case product?.product_type === "variant" && !productVariant?.id && !color:
        setText("Izaberite boju");
        break;
      case product?.product_type === "variant" &&
        !productVariant?.id &&
        color !== "":
        setText("Izaberite veličinu");
        break;
      case product?.product_type === "variant" && productVariant?.id:
        setText("Dodaj u korpu");
    }
  };
  const handleTextChangeBuyNow = () => {
    switch (true) {
      case product?.product_type === "variant" && !productVariant?.id && !color:
        setText2("Izaberite boju");
        break;
      case product?.product_type === "variant" && !productVariant?.id && color:
        setText2("Izaberite veličinu");
        break;
      case product?.product_type === "variant" && productVariant?.id:
        setText2("Dodaj u korpu");
    }
  };
  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodaj u korpu");
      setText2("Kupi odmah");
    }
  }, [productVariant]);

  const [openModal, setOpenModal] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if ((text2 === "Izaberite boju" || text === "Izaberite boju") && color) {
      setText("Izaberite veličinu");
      setText2("Izaberite veličinu");
    }
  }, [color]);

  return (
    <>
      {product ? (
        <>
          <div className="max-lg:col-span-4 mt-[2rem] lg:col-span-2 ">
            <div className="max-lg:flex hidden items-center gap-2 flex-wrap">
              <Link
                href={`/`}
                className="text-[#191919] text-[0.75rem] font-normal hover:text-[#e10000]"
              >
                Početna
              </Link>{" "}
              <>/</>{" "}
              {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
                return (
                  <div className="flex items-center gap-2">
                    <Link
                      href={
                        index === arr.length - 1
                          ? `/kategorije/${breadcrumb?.slug}`
                          : `/kategorije/${breadcrumb?.slug}`
                      }
                      className="text-[#191919] text-[0.75rem] font-normal hover:text-[#e10000]"
                    >
                      {breadcrumb?.name}
                    </Link>
                    {index !== arr.length - 1 && <>/</>}
                  </div>
                );
              })}
              <>/</>
              <h1 className="text-[#191919] text-[0.75rem] font-normal">
                {breadcrumbs?.end?.name}
              </h1>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-[1.563rem] max-md:text-[1.1rem] font-bold group">
                {product?.data?.item?.basic_data?.name}
              </h1>
              <h2 className="mt-[6px] text-[#636363] text-[0.688rem]">
                Šifra:&nbsp;
                {productVariant?.id
                  ? productVariant?.basic_data?.sku
                  : product?.data?.item?.basic_data?.sku}
              </h2>
              <div
                className={`mt-[2.125rem] text-[1.313rem] flex items-center gap-3 font-bold`}
              >
                <ProductPrice
                  price={
                    productVariant?.id
                      ? productVariant?.price
                      : product?.data?.item?.price
                  }
                  inventory={
                    productVariant?.id
                      ? productVariant?.inventory
                      : product?.data?.item?.inventory
                  }
                  className={
                    product?.data?.item?.price?.discount?.active
                      ? `font-bold text-[21px] px-3 py-0.5 bg-[#f8ce5d]`
                      : `font-normal text-[1.172rem]  py-0.5`
                  }
                />
                {product?.data?.item?.price?.discount?.active && (
                  <div className="group relative inline-block">
                    <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-green-500 text-white p-[6px] rounded absolute -top-8 left-0 text-[10px] font-normal">
                      Važeća MP cena
                      <svg
                        className="absolute z-50 w-6 h-6 text-green-500 transform left-[45%] -translate-x-1/2 -translate-y-[2px] fill-current stroke-current"
                        width="8"
                        height="8"
                      >
                        <rect
                          x="12"
                          y="-10"
                          width="8"
                          height="8"
                          transform="rotate(45)"
                        />
                      </svg>
                    </span>
                    <span className="text-[#171717] text-[19px] line-through font-normal">
                      {currencyFormat(
                        product?.data?.item?.price?.price?.original
                      )}
                    </span>
                  </div>
                )}
              </div>
              {product?.data?.item?.price?.discount?.active && (
                <div className="mt-3">
                  <h2 className="text-[17px] text-[#2bc48a] font-semibold">
                    Ušteda:{" "}
                    {currencyFormat(
                      product?.data?.item?.price?.discount?.amount
                    )}
                  </h2>
                </div>
              )}
              {product?.data?.item?.price?.discount?.campaigns?.length > 0 && (
                <CampaignsDetails campaignsDate={campaignsDate} />
              )}
              <p
                className={`mt-3 max-md:mt-[1.5rem] max-w-[90%] text-sm !font-normal`}
              >
                {product?.data?.item?.basic_data?.short_description}
              </p>
            </div>
            {product?.product_type === "variant" && (
              <div className="pt-12 pb-7 max-md:py-[1.5rem]">
                <Variants
                  firstVariantOption={true}
                  product={product}
                  productSlug={path}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                  setSelectedColor={setSelectedColor}
                  productVariant={productVariant}
                  setVariant={false}
                  setVariantOnOff={setVariantOnOff}
                  slug={path}
                />
              </div>
            )}
            <button className="flex items-center gap-2">
              <Image
                src={"/icons/measure.png"}
                alt="measure"
                width={30}
                height={20}
              />
              <span
                onClick={() => setOpenModal(!openModal)}
                className="text-[13px] font-bold"
              >
                Pomoć za veličine
              </span>
            </button>
            <div className="mt-[3rem] max-md:mt-[2rem] flex items-center gap-3">
              <button
                className={
                  productVariant === null || productVariant.length === 0
                    ? `max-sm:w-[8.5rem] ${
                        text === "Izaberite veličinu" ||
                        text === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#2bc48a]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold  relative`
                    : `max-sm:w-[8.5rem] ${
                        text === "Izaberite veličinu" ||
                        text === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#2bc48a]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold`
                }
                onClick={() => {
                  if (
                    product?.product_type === "variant" &&
                    productVariant?.id
                  ) {
                    addToCart();
                  }
                  if (product?.product_type === "single") {
                    addToCart();
                  }
                  handleTextChangeAddToCart();
                }}
              >
                {text}
              </button>
              <button
                className={
                  productVariant === null || productVariant.length === 0
                    ? `max-sm:w-[8.5rem] ${
                        text2 === "Izaberite veličinu" ||
                        text2 === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#191919]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold  relative`
                    : `max-sm:w-[8.5rem] ${
                        text2 === "Izaberite veličinu" ||
                        text2 === "Izaberite boju"
                          ? `bg-red-500`
                          : `bg-[#191919]`
                      } sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem]  flex justify-center items-center uppercase text-white text-sm font-bold`
                }
                onClick={() => {
                  if (
                    product?.product_type === "variant" &&
                    productVariant?.id
                  ) {
                    addToCart();
                    router.push("/korpa");
                  }
                  handleTextChangeBuyNow();
                }}
              >
                {text2}
              </button>
              <div
                className="w-[39px] h-[35px] cursor-pointer"
                onClick={addToWishlist}
              >
                <Image
                  src={isInWishlist ? WishlistActive : Wishlist}
                  alt="wishlist"
                  width={39}
                  height={35}
                  className="h-full object-cover"
                />
              </div>
            </div>
            <div className="md:hidden mt-5 flex items-center gap-[10px] justify-between py-5 ">
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={FreeDelivery}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">Besplatna dostava</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={Calendar}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">2 dana isporuka</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={DeliveryStatus}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">Povrat do 14 dana</p>
              </div>
            </div>
            <div className="mt-[3.2rem] max-md:mt-[2rem] max-md:flex max-md:items-center max-md:justify-center max-md:w-full">
              {/*<ul className="flex flex-row gap-[47px] text-[13px] relative separate">*/}
              {/*  <div*/}
              {/*    className="relative cursor-pointer"*/}
              {/*    onClick={() => setDeliveryModal(true)}*/}
              {/*  >*/}
              {/*    Dostava*/}
              {/*  </div>*/}
              {/*  <div*/}
              {/*    className="relative cursor-pointer"*/}
              {/*    onClick={() => setInfoModal(true)}*/}
              {/*  >*/}
              {/*    Informacije*/}
              {/*  </div>*/}
              {/*  <div*/}
              {/*    className="relative cursor-pointer"*/}
              {/*    onClick={() => setReturnModal(true)}*/}
              {/*  >*/}
              {/*    Povraćaj*/}
              {/*  </div>*/}
              {/*</ul>*/}

              <div className={`flex flex-col divide-y md:max-w-[80%]`}>
                {specification?.length > 0 &&
                  specification?.map((item) => {
                    return (
                      <div key={item?.set?.id}>
                        <div
                          onClick={() =>
                            setActiveTab(
                              activeTab === item?.set?.id ? null : item?.set?.id
                            )
                          }
                          className={`pl-3 hover:bg-[#f8f8f8] ${
                            activeTab === item?.set?.id && "bg-[#f8f8f8]"
                          } py-3 cursor-pointer flex items-center justify-between`}
                        >
                          <span className={`uppercase`}>{item?.set?.name}</span>
                          <i
                            className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
                              activeTab === item?.set?.id ? "up" : "down"
                            }`}
                          />
                        </div>
                        {activeTab === item?.set?.id && (
                          <div
                            className={`py-4 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
                          >
                            <p className={`text-sm`}>
                              {item?.groups[0]?.attributes[0]?.values?.map(
                                (val) => (
                                  <p className={`font-medium`} key={val?.id}>
                                    - {val?.name}
                                  </p>
                                )
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                <div>
                  <div
                    onClick={() =>
                      setActiveTab(
                        activeTab === "declaration" ? null : "declaration"
                      )
                    }
                    className={`pl-3 hover:bg-[#f8f8f8] ${
                      activeTab === 3 && "bg-[#f8f8f8]"
                    } py-3 cursor-pointer flex items-center justify-between`}
                  >
                    DEKLARACIJA{" "}
                    <i
                      className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
                        activeTab === "declaration" ? "up" : "down"
                      }`}
                    />
                  </div>
                  {activeTab === "declaration" && (
                    <div
                      className={`py-4 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
                    >
                      <p className={`text-sm`}>
                        {declaration?.manufacture_name && (
                          <span>
                            Proizvođač: {declaration?.manufacture_name}
                          </span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.country_name && (
                          <span>
                            Zemlja porekla: {declaration?.country_name}
                          </span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.name && (
                          <span>Naziv: {declaration?.name}</span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.year && (
                          <span>Godina proizvodnje: {declaration?.year}</span>
                        )}
                      </p>
                      <p className={`text-sm`}>
                        {declaration?.importer_name && (
                          <span>Uvoznik: {declaration?.importer_name}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="max-md:hidden fixed z-[95] max-w-[114px] right-0 2xl:top-[28%] top-[20%] flex flex-col gap-[30px] px-5 2xl:py-[37px] py-5 bg-white drop-shadow-2xl rounded-l-lg">
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={FreeDelivery}
                  alt="free delivery"
                  width={50}
                  height={50}
                />
                <p className="text-sm regular">Besplatna dostava</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={Calendar}
                  alt="free delivery"
                  width={47}
                  height={42}
                />
                <p className="text-sm regular">2 dana isporuka</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={DeliveryStatus}
                  alt="free delivery"
                  width={46}
                  height={46}
                />
                <p className="text-sm regular">Povrat do 14 dana</p>
              </div>
            </div>
          </div>
          {/*<DeliveryModal*/}
          {/*  deliveryModal={deliveryModal}*/}
          {/*  setDeliveryModal={setDeliveryModal}*/}
          {/*/>*/}
          {/*<InfoModal infoModal={infoModal} setInfoModal={setInfoModal} />*/}
          {/*<ReturnModal*/}
          {/*  returnModal={returnModal}*/}
          {/*  setReturnModal={setReturnModal}*/}
          {/*/>*/}

          {(deliveryModal || infoModal || returnModal || openModal) && (
            <div
              className="fixed z-[100] bg-black bg-opacity-40 top-0 left-0 w-screen h-screen transition-all duration-500"
              onClick={() => {
                setDeliveryModal(false);
                setInfoModal(false);
                setReturnModal(false);
                setOpenModal(false);
              }}
            ></div>
          )}
          <ToastContainer />
        </>
      ) : (
        notFound()
      )}
      <div
        className={
          openModal
            ? `border-l translate-x-0 fixed top-0 right-0 bg-white transition-all duration-500 z-[100] h-screen w-[50%]`
            : `border-l translate-x-full fixed top-0 right-0 bg-white transition-all duration-500 z-[100] h-screen w-[50%]`
        }
      >
        <div className={`p-5 overflow-y-auto h-full`}>
          <h2 className={`text-[1.2rem] w-full pb-2 border-b`}>
            Tabele mera za žene (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>XS</th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>XXL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 px-2 font-bold`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>89-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>60-64</td>
                  <td className={`text-left`}>64-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-76</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-86</td>
                </tr>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left px-2 py-2 font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>92-96</td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>110-114</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za žene (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>27</th>
                  <th className={`text-left`}>28</th>
                  <th className={`text-left`}>29</th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>62-65</td>
                  <td className={`text-left`}>65-68</td>
                  <td className={`text-left`}>68-72</td>
                  <td className={`text-left`}>72-74</td>
                  <td className={`text-left`}>74-78</td>
                  <td className={`text-left`}>78-82</td>
                  <td className={`text-left`}>82-28</td>
                  <td className={`text-left`}>68-92</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 pl-2 font-bold`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>90-93</td>
                  <td className={`text-left`}>93-96</td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>105-110</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za muškarce (gornji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>S</th>
                  <th className={`text-left`}>M</th>
                  <th className={`text-left`}>L</th>
                  <th className={`text-left`}>XL</th>
                  <th className={`text-left`}>2XL</th>
                  <th className={`text-left`}>3XL</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim grudi
                  </td>
                  <td className={`text-left`}>96-100</td>
                  <td className={`text-left`}>100-104</td>
                  <td className={`text-left`}>104-108</td>
                  <td className={`text-left`}>110-114</td>
                  <td className={`text-left`}>114-118</td>
                  <td className={`text-left`}>118-112</td>
                </tr>
                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 pl-2 font-bold`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>80-84</td>
                  <td className={`text-left`}>84-88</td>
                  <td className={`text-left`}>88-92</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-104</td>
                </tr>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                  <td className={`text-left`}>106-110</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className={`text-[1.2rem] mt-10 w-full pb-2 border-b`}>
            Tabele mera za muškarce (donji deo)
          </h2>
          <div className={`mt-5`}>
            <table className={`w-full`}>
              <thead>
                <tr className={`border-b`}>
                  <th className={`text-left`}></th>
                  <th className={`text-left`}>30</th>
                  <th className={`text-left`}>31</th>
                  <th className={`text-left`}>32</th>
                  <th className={`text-left`}>33</th>
                  <th className={`text-left`}>34</th>
                  <th className={`text-left`}>36</th>
                  <th className={`text-left`}>38</th>
                  <th className={`text-left`}>40</th>
                </tr>
              </thead>
              <tbody>
                <tr className={`border-b !py-2 bg-[#f8f8f8]`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim struka
                  </td>
                  <td className={`text-left`}>78-81</td>
                  <td className={`text-left`}>81-84</td>
                  <td className={`text-left`}>84-87</td>
                  <td className={`text-left`}>87-90</td>
                  <td className={`text-left`}>90-94</td>
                  <td className={`text-left`}>94-98</td>
                  <td className={`text-left`}>98-102</td>
                  <td className={`text-left`}>102-106</td>
                </tr>

                <tr className={`border-b !py-2`}>
                  <td className={`text-left py-2 font-bold pl-2`}>
                    Obim kukova
                  </td>
                  <td className={`text-left`}>96-99</td>
                  <td className={`text-left`}>99-102</td>
                  <td className={`text-left`}>102-105</td>
                  <td className={`text-left`}>105-108</td>
                  <td className={`text-left`}>108-112</td>
                  <td className={`text-left`}>112-116</td>
                  <td className={`text-left`}>116-120</td>
                  <td className={`text-left`}>120-124</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
