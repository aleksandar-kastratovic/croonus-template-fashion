"use client";

import Image from "next/image";
import CheckoutUserInfo from "@/components/Cart/CheckoutUserInfo";
import CheckoutOptions from "@/components/Cart/CheckoutOptions";
import CheckoutTotals from "@/components/Cart/CheckoutTotals";
import { Suspense, useEffect, useState } from "react";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import Spinner from "@/components/UI/Spinner";
import { useCheckout, useRemoveFromCart } from "@/hooks/ecommerce.hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CheckoutData = ({
  className,
  formData,
  setFormData,
  paymentoptions,
  deliveryoptions,
  summary,
  items,
  options,
  totals,
  refreshCart,
  errors,
  setErrors,
  refreshSummary,
}) => {
  const [postErrors, setPostErrors] = useState({
    fields: [],
  });
  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data,
    mutate: checkOut,
    isPending,
    isSuccess: isCheckoutSuccess,
    status,
  } = useCheckout({
    formData: formData,
    setPostErrors: setPostErrors,
    setLoading: setLoading,
  });

  const required = [
    "payment_method",
    "delivery_method",
    "first_name_shipping",
    "last_name_shipping",
    "phone_shipping",
    "email_shipping",
    "address_shipping",
    "town_name_shipping",
    "zip_code_shipping",
    "object_number_shipping",
    "accept_rules",
    
  ];

  const router = useRouter();

  const filterOutProductsOutOfStock = (data) => {
    const productsOutOfStock = [];
    data?.forEach((item) => {
      if (!item?.product?.inventory?.inventory_defined) {
        productsOutOfStock.push({
          cart: {
            id: null,
            item_id: null,
          },
          product: {
            name: item?.product?.basic_data?.name,
            sku: item?.product?.basic_data?.sku,
            slug: item?.product?.slug,
            image: item?.product?.image,
            id: item?.product?.id,
          },
        });
      }
    });
    setPostErrors({
      ...postErrors,
      fields: productsOutOfStock,
    });
  };

  useEffect(() => {
    if (items && !isClosed) {
      filterOutProductsOutOfStock(items);
    }
  }, [items]);

  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();

  useEffect(() => {
    if (isSuccess) {
      refreshCart();
      refreshSummary();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isCheckoutSuccess && data) {
      switch (true) {
        case data?.credit_card === null:
          router.push(`/korpa/kupovina/${data?.order?.order_token}`);
          break;
        case data?.credit_card !== null:
          const credit_card_form = data?.payment_provider_data?.form;
          const form = document.createElement("div");
          form.innerHTML = credit_card_form;
          document.body.appendChild(form);
          const formData = document.getElementById("bank_send_form");
          formData?.submit();
          break;
        default:
          break;
      }
    }
  }, [isCheckoutSuccess]);
  console.log(status);
  return (
    <>
      <div className={`col-span-5 flex flex-col gap-5 lg:col-span-3`}>
        <CheckoutUserInfo
          errors={errors}
          setErrors={setErrors}
          setFormData={setFormData}
          formData={formData}
          className={className}
          items={items}
          refreshCart={refreshCart}
          refreshSummary={refreshSummary}
        />
        <CheckoutOptions
          errors={errors}
          setErrors={setErrors}
          deliveryoptions={deliveryoptions}
          paymentoptions={paymentoptions}
          setFormData={setFormData}
          formData={formData}
          className={className}
          summary={summary}
          options={options}
          totals={totals}
        />
      </div>
      <div className={`col-span-5 flex flex-col gap-3 lg:col-span-2`}>
        <div
          className={`customScroll mb-16 flex max-h-[400px] flex-col gap-5 overflow-y-auto sm:mb-10`}
        >
          {items?.map(
            ({
              product: {
                basic_data: { id_product, name, sku },
                price,
                inventory,
                image,
                slug_path,
              },
              cart: { quantity },
            }) => {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <CheckoutItems
                    key={id_product}
                    id={id_product}
                    name={name}
                    price={price}
                    isClosed={isClosed}
                    refreshSummary={refreshSummary}
                    quantity={+quantity}
                    inventory={inventory}
                    image={image}
                    sku={sku}
                    className={className}
                    refreshCart={refreshCart}
                    slug_path={slug_path}
                  />
                </Suspense>
              );
            },
          )}
        </div>
        <div className={`bg-[#f7f7f7] p-3`}>
          <h3
            className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline`}
          >
            VREDNOST VAŠE KORPE
          </h3>
          <CheckoutTotals
            totals={totals}
            options={options}
            summary={summary}
            className={className}
            formData={formData}
          />
        </div>
        <div className="mt-2 flex gap-3 py-3 relative">
          <input
            type="checkbox"
            id="accept_rules"
            name="accept_rules"
            onChange={(e) => {
              setFormData({
                ...formData,
                accept_rules: e.target.checked,
              });
              setErrors(
                errors?.filter((error) => error !== "accept_rules"),
              );
            }}
            checked={formData.accept_rules}
            className="focus:ring-0 focus:border-none rounded-full focus:outline-none text-[#191919] bg-white"
          />
          <label
            htmlFor="agreed"
            className={`pb-4 text-[0.965rem] font-light ${className}  underline ${
              errors?.includes("accept_rules") ? `text-red-500` : ``
            }`}
          >
            Saglasan sam sa 
            <a
              className={`text-[#e10000] underline max-md:text-[1.15rem]`}
              href={`/stranica-u-izradi`}
              target={`_blank`}
            >
              <span> Opštim uslovima korišćenja</span>
            </a>{" "}
            ECOMMERCE ONLINE SHOP-a.
          </label>
        </div>
        <button
          disabled={isPending}
          className={`mt-2 w-full ${
            isPending && "!bg-white !text-black opacity-50"
          } h-[3rem] text-center uppercase text-white ${className} border border-[#747579] bg-black py-2 font-light transition-all duration-500 hover:border-[#747579] hover:bg-white hover:text-black`}
          onClick={() => {
            let err = [];
            required.forEach((key) => {
              if (!formData[key]) {
                err.push(key);
              }
            });
            setErrors(err);
            if (err?.length === 0) {
              checkOut();
            } else {
              window.scrollTo(0, 0);
            }
          }}
        >
          {isPending ? (
            <Spinner className={`-top-1 !mr-[3rem]`} />
          ) : (
            "ZAVRŠI KUPOVINU"
          )}
        </button>
      </div>
      <NoStockModal
        className={className}
        postErrors={postErrors}
        setPostErrors={setPostErrors}
        removeFromCart={removeFromCart}
        setIsClosed={setIsClosed}
      />
      {isCheckoutSuccess && data?.credit_card === null && loading && (
        <div
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`}
        >
          <Spinner className={`!scale-125`} />
        </div>
      )}
    </>
  );
};

export default CheckoutData;

const NoStockModal = ({
  postErrors,
  setPostErrors,
  removeFromCart,
  setIsClosed,
  className,
}) => {
  return (
    <div
      onClick={(e) => {}}
      className={
        postErrors?.fields?.length > 0
          ? `visible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500`
          : `invisible fixed left-0 top-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500`
      }
    >
      <div
        className={`relative inset-0 m-auto h-fit w-fit rounded-md bg-white p-[1rem] max-sm:mx-2`}
      >
        <Image
          src={`/fail.png`}
          alt={`ecommerce`}
          width={100}
          height={100}
          className={`absolute -top-[3.15rem] left-0 right-0 mx-auto`}
        />
        <div className={`mt-[3rem] px-[0.25rem] md:px-9`}>
          <h3 className={`mt-4 text-center text-xl font-semibold ${className}`}>
            U korpi su proizvodi koji trenutno nisu na stanju.
          </h3>
          <p className={`mt-2 text-center text-base font-normal ${className}`}>
            Kako bi završili porudžbinu, morate izbrisati sledeće artikle iz
            korpe:
          </p>
          <div
            className={`divide-y-black mt-[0.85rem] flex flex-col divide-y px-5`}
          >
            {postErrors?.fields?.map(
              ({
                cart: { id, item_id },
                product: { id: id_product, name, sku, slug, image },
                errors,
              }) => {
                let deleted_items_count = 0;
                //ako je deleted_items_count jednak broju proizvoda koji nisu na lageru, gasimo modal
                if (deleted_items_count === postErrors?.fields?.length) {
                  setPostErrors(null);
                }

                return (
                  <div
                    key={id}
                    className={`flex items-start gap-2 py-[1.55rem]`}
                  >
                    <Link href={`/${slug}`}>
                      <Image
                        src={image[0]}
                        alt={name ?? sku ?? slug ?? "Ecommerce"}
                        width={60}
                        height={100}
                        className={`aspect-2/3 max-h-[72px]`}
                      />
                    </Link>
                    <div className={`flex flex-col`}>
                      <Link
                        href={`/${slug}`}
                        className={`text-sm font-normal ${className}`}
                      >
                        {name}
                      </Link>
                      <ul className={`flex flex-col gap-1`}>
                        {(errors ?? ["Trenutno nije na stanju."])?.map(
                          (error) => (
                            <li
                              key={error}
                              className={`text-[13px] font-bold text-[#e10000] ${className}`}
                            >
                              {error}
                            </li>
                          ),
                        )}
                      </ul>
                      <button
                        onClick={async () => {
                          await removeFromCart({ id: id_product });

                          //nakon brisanja, iz postErrors.fields filtriramo taj item i izbacujemo ga
                          let arr = [];
                          arr = postErrors?.fields?.filter(
                            (item) => item.product.id !== id_product,
                          );
                          setPostErrors({
                            ...postErrors,
                            fields: arr,
                          });
                        }}
                        className={`mt-1 flex w-[10rem] items-center justify-between bg-[#000] px-2 py-[0.225rem] font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
                      >
                        Ukloni iz korpe{" "}
                        <i className="fa-solid fa-trash ml-auto"></i>
                      </button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className={`mt-2 flex items-center justify-end`}>
          <button
            className={`ml-auto mt-1 flex items-center justify-between bg-[#000] px-12 py-2 text-center font-normal text-white transition-all duration-300 hover:bg-[#e10000] hover:bg-opacity-80 ${className}`}
            onClick={() => {
              setPostErrors(null);
              setIsClosed(true);
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
