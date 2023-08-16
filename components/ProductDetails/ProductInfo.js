"use client";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Measure from "../../assets/Icons/measure.png";
import Wishlist from "../../assets/Icons/heart.png";
import DeliveryStatus from "../../assets/Icons/delivery-status.png";
import Calendar from "../../assets/Icons/calendar.png";
import FreeDelivery from "../../assets/Icons/package.png";
import Cancel from "../../assets/Icons/cancel.png";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ProductPrice/ProductPrice";

const ProductInfo = ({
  product,
  desc,
  path,
  isNewURL,
  setIsNewURL,
  setVariantKey,
  variantKey,
  setColor,
}) => {
  const [productVariant, setProductVariant] = useState(null);

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

  const handleTextChange = () => {
    if (product?.product_type === "variant" && !productVariant?.id) {
      setText("Izaberite veličinu");
    }
  };

  useEffect(() => {
    if (product?.product_type === "variant" && productVariant?.id) {
      setText("Dodaj u korpu");
    }
  }, [productVariant]);

  return (
    <>
      {product ? (
        <>
          <div className="max-md:col-span-4 mt-[2rem] md:col-span-2 ">
            <div className="flex flex-col ">
              <h1 className="text-[1.563rem] max-md:text-[1.1rem] font-bold">
                {product?.data?.item?.basic_data?.name}
              </h1>
              <h2 className="mt-[1.063rem] text-[#636363] text-[0.688rem]">
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
                />
                {product?.data?.item?.price?.discount?.active && (
                  <span className="text-[#636363] text-[1rem] line-through">
                    {currencyFormat(
                      product?.data?.item?.price?.price?.original
                    )}
                  </span>
                )}
              </div>
              <p
                className="mt-[2.438rem] max-md:mt-[1.5rem] max-w-[90%] text-sm font-regular"
                dangerouslySetInnerHTML={{ __html: desc?.description }}
              ></p>
            </div>
            {product?.product_type === "variant" && (
              <div className="py-[2.75rem] max-md:py-[1.5rem]">
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
            <div className="flex items-center gap-2">
              <Image src={Measure} alt="measure" width={30} height={20} />
              <span className="text-[13px] font-bold">Pomoć za veličine</span>
            </div>
            <div className="mt-[4.188rem] max-md:mt-[2rem] flex items-center gap-3">
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
                  handleTextChange();
                }}
              >
                {text}
              </button>
              <button
                disabled={
                  productVariant === null || productVariant.length === 0
                }
                className={
                  productVariant === null || productVariant.length === 0
                    ? `max-sm:w-[8.5rem] sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem] bg-[#191919] flex justify-center items-center uppercase text-white text-sm font-bold cursor-not-allowed relative`
                    : `max-sm:w-[8.5rem] sm:w-[15.313rem] hover:bg-opacity-80 h-[3.25rem] bg-[#191919] flex justify-center items-center uppercase text-white text-sm font-bold`
                }
                onClick={() => {
                  addToCart();
                  router.push("/korpa");
                }}
              >
                Kupi odmah
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
            <div className="mt-[5.125rem] max-md:mt-[2rem] max-md:flex max-md:items-center max-md:justify-center max-md:w-full">
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
            <div className="max-md:hidden fixed z-[100] max-w-[114px] right-0 top-[30%] flex flex-col gap-[30px] px-5 py-[37px] bg-white drop-shadow-2xl rounded-l-lg">
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
          <div
            className={
              deliveryModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Dostava</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setDeliveryModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  pazari.rs vrši kurirska služba „YU – PD Express“ d.o.o .
                  Beograd – D Express, na teritoriji Republike Srbije, radnim
                  danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
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
          <ToastContainer />
        </>
      ) : (
        notFound()
      )}
    </>
  );
};

export default ProductInfo;
