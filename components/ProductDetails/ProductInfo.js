"use client";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "../../assets/Icons/heart.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import CampaignsDetails from "./CampaignsDetails";
import DeliveryModal from "./DeliveryModal";
import InfoModal from "./InfoModal";
import ReturnModal from "./ReturnModal";

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
}) => {
  const [productVariant, setProductVariant] = useState(null);
  const campaignsDate = product?.data?.item?.price?.discount?.campaigns[0]?.duration
  
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

  const [productAmount, setProductAmount] = useState(1);
  const globalAddToCart = useGlobalAddToCart();
  const globalAddToWishList = useGlobalAddToWishList();
  const [setVariant, setVariantOnOff] = useState(true);
  const addToWishlist = (e) => {
    globalAddToWishList(product.data.item.basic_data?.id_product);
    toast.success(
      `Proizvod ${product.data.item.basic_data?.name} dodat u listu želja!`,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };
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
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText("Izaberite veličinu");
    }
  };
  const handleTextChangeBuyNow = () => {
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText2("Izaberite veličinu");
    }
  };
  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodaj u korpu");
      setText2("Kupi odmah");
    }
  }, [productVariant]);
  
  return (
    <>
      {product ? (
        <>
          <div className="max-md:col-span-4 mt-[2rem] md:col-span-2 ">
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
                                <svg class="absolute z-50 w-6 h-6 text-green-500 transform left-[45%] -translate-x-1/2 -translate-y-[2px] fill-current stroke-current" width="8" height="8">
                      <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
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
                  <div className='mt-3'>
                     <h2 className='text-[17px] text-[#2bc48a] font-semibold'>Ušteda: {currencyFormat(product?.data?.item?.price?.discount?.amount)}</h2>
                  </div>
                  )}
              {product?.data?.item?.price?.discount?.campaigns?.length > 0 && (
                <CampaignsDetails campaignsDate={campaignsDate} />
              )}
                
              <p
                className="mt-7 max-md:mt-[1.5rem] max-w-[90%] text-sm font-regular"
                dangerouslySetInnerHTML={{ __html: desc?.description }}
              ></p>
            </div>
            {product?.product_type === "variant" && (
              <div className="pt-12 pb-7 max-md:py-[1.5rem]">
                <Variants
                  firstVariantOption={productVariant ? false : true}
                  product={product}
                  productSlug={path}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                  setSelectedColor={setSelectedColor}
                  productVariant={productVariant}
                  setVariant={setVariant}
                  setVariantOnOff={setVariantOnOff}
                  slug={path}
                />
              </div>
            )}
            <button className="flex items-center gap-2">
             <Image src={'/icons/measure.png'} alt="measure" width={30} height={20} />
             <span className="text-[13px] font-bold">Pomoć za veličine</span>
            </button>
            <div className="mt-[3rem] max-md:mt-[2rem] flex items-center gap-3">
              <button
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
                  if (
                    product?.product_type === "variant" &&
                    productVariant?.id
                  ) {
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
                  src={Wishlist}
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
              <ul className="flex flex-row gap-[47px] text-[13px] relative separate">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDeliveryModal(true)}
                >
                  Dostava
                </div>
                <div
                 className="relative cursor-pointer"
                 onClick={() => setInfoModal(true)}
                >
                 Informacije
                </div>
                <div
                 className="relative cursor-pointer"
                 onClick={() => setReturnModal(true)}
                >
                 Povraćaj
                </div>
              </ul>
            </div>
            <div className="max-md:hidden fixed z-[100] max-w-[114px] right-0 2xl:top-[48%] top-[55%] flex flex-col gap-[30px] px-5 2xl:py-[37px] py-5 bg-white drop-shadow-2xl rounded-l-lg">
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
            <DeliveryModal deliveryModal={deliveryModal} setDeliveryModal={setDeliveryModal} />
            <InfoModal infoModal={infoModal} setInfoModal={setInfoModal} />
            <ReturnModal  returnModal={returnModal} setReturnModal={setReturnModal} />
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
          <ToastContainer />
        </>
      ) : (
        notFound()
      )}
    </>
  );
};

export default ProductInfo;
