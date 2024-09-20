"use client";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import CheckoutData from "../Cart/CheckoutData";
import { useCartContext } from "@/api/cartContext";
import { get, list, post } from "@/api/api";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { currencyFormat } from "@/helpers/functions";
import { Breadcrumb } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import { useCart, useForm, useSummary } from "@/hooks/ecommerce.hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userContext } from "@/context/userContext";
import { getBillingCartForm } from "@/_functions";

const CheckoutPage = ({
  paymentoptions,
  deliveryoptions,
  recommendedProducts,
  countries,
  className,
}) => {
  const { loggedIn } = useContext(userContext);

  const [selected, setSelected] = useState({
    id: null,
    use_same_data: true,
  });

  const {
    tmp_form_data: { all_forms, form },
  } = getBillingCartForm(selected?.id, loggedIn);

  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    customer_type_billing: "personal",
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    id_country_shipping: "193",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: "",
    town_name_billing: "",
    zip_code_billing: "",
    id_country_billing: "193",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: null,
    note: "",
    gcaptcha: token,
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    company_name_shipping: null,
    pib_shipping: null,
    maticni_broj_shipping: null,
    floor_shipping: null,
    apartment_number_shipping: null,
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  });

  const {
    data: dataTmp,
    setData: setDataTmp,
    errors: errorsTmp,
    setErrors: setErrorsTmp,
  } = useForm(formData);

  useEffect(() => {
    if (form) {
      Object.entries(form).forEach(([key, value]) => {
        if (key?.includes("billing")) {
          setDataTmp((prev) => ({
            ...prev,
            [key]: value ?? "",
          }));
        }
      });
    }
  }, [selected?.id]);

  useEffect(() => {
    if (selected?.use_same_data) {
      if (form) {
        Object?.entries(form).forEach(([key, value]) => {
          if (key?.includes("billing")) {
            const new_key = key.replace("billing", "shipping");
            setDataTmp((prev) => ({
              ...prev,
              [new_key]: value ?? null,
            }));
          }
        });
      }
    } else {
      Object?.entries(dataTmp).forEach(([key, value]) => {
        if (key?.includes("shipping")) {
          setDataTmp((prev) => ({
            ...prev,
            [key]: null,
          }));
        }
      });
    }
  }, [selected?.id, selected?.use_same_data]);
  //fetchujemo sve artikle iz korpe
  const { data: items, refetch: refreshCart, isFetching } = useCart();

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const { data, refetch: refreshSummary } = useSummary({
    items: items?.items?.map((item) => {
      return Number(item?.cart?.quantity);
    }),
    formData: formData,
  });

  const [errors, setErrors] = useState([]);

  const cartItems = items?.items ?? [];
  const cartCost = items?.items?.summary?.total ?? 0;

  const renderCart = () => {
    switch (true) {
      case isFetching:
        return (
          <div
            className={`mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder`}
          >
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
          </div>
        );
      case items?.items?.length > 0 && !isFetching:
        return (
          <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
            <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
            <div className="mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder">
              <div className="md:hidden bg-[#f5f5f6]">
                <div className="font-semibold py-3  text-xl w-[85%] mx-auto">
                  Korpa
                </div>
              </div>
              <>
                <div className="grid grid-cols-5 gap-y-3 gap-x-3 max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem] ">
                  <div className="col-span-5 bg-white p-1 max-xl:row-start-1">
                    <div className={`xl:hidden py-5`}>
                      <div className={`max-xl:w-full xl:w-[400px] mt-2`}>
                        {/*bar for measuring*/}
                        <div className="w-full h-1 bg-[#f5f5f7] mt-3">
                          <div
                            className="h-full relative transition-all duration-500 bg-[#2bc48a]"
                            style={{
                              width: `${
                                (data?.summary?.totals?.items_discount / 6000) *
                                  100 >
                                100
                                  ? 100
                                  : (data?.summary?.totals?.items_discount /
                                      6000) *
                                    100
                              }%`,
                            }}
                          >
                            <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                              <span className="text-black font-bold text-[0.5rem] px-[0.275rem] py-1 bg-white rounded-full border-2 border-[#2bc48a] ">
                                {data?.summary?.totals?.items_discount > 6000
                                  ? 100
                                  : Math.round(
                                      (data?.summary?.totals?.items_discount /
                                        6000) *
                                        100
                                    )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        <h1
                          className={`text-base text-[#e10000] mt-3 font-bold ${
                            data?.summary?.totals?.items_discount > 6000
                              ? "hidden"
                              : ""
                          }`}
                        >
                          Do besplatne dostave nedostaje ti još{" "}
                          {currencyFormat(
                            6000 - data?.summary?.totals?.items_discount
                          )}
                        </h1>
                      </div>
                      {cartCost > 6000 && (
                        <h1 className="text-base text-[#2bc48a] mt-3 font-bold">
                          Besplatna dostava
                        </h1>
                      )}
                    </div>

                    <div className={`flex items-center justify-between`}>
                      <h2 className="text-xl font-bold ">Informacije</h2>
                    </div>
                    <div className={`mt-5 grid grid-cols-5 gap-[3.75rem]`}>
                      <CheckoutData
                        loggedIn={loggedIn}
                        selected={selected}
                        setSelected={setSelected}
                        all_forms={all_forms}
                        setFormData={setDataTmp}
                        formData={dataTmp}
                        className={className}
                        deliveryoptions={deliveryoptions}
                        paymentoptions={paymentoptions}
                        items={items?.items}
                        refreshSummary={refreshSummary}
                        summary={data?.summary}
                        options={data?.summary?.options}
                        totals={data?.summary?.totals}
                        refreshCart={refreshCart}
                        errors={errorsTmp}
                        setErrors={setErrorsTmp}
                      />
                    </div>
                  </div>
                </div>

                <RecommendedProducts
                  recommendedProducts={recommendedProducts}
                  action4={`Gledali ste i ove modele`}
                />
              </>
            </div>
          </GoogleReCaptchaProvider>
        );
      case items?.items?.length === 0 && !isFetching:
        return (
          <>
            <div className="nocontent-holder mt-[1.2rem] lg:mt-[13rem] flex items-center justify-center max-md:w-[95%] mx-auto">
              <div className="text-center justify-center items-center flex flex-col border border-[#f8f8f8] rounded-3xl p-10">
                <div className="text-center">
                  <span className="text-2xl font-medium">Vaša korpa</span>
                </div>
                <div className="mt-6 text-center text-lg font-medium">
                  Trenutno ne postoji sadržaj u Vašoj korpi.
                </div>
                <div className="mt-5 text-center">
                  <Link href="/">
                    <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                      Vrati se na početnu stranu
                    </button>
                  </Link>
                </div>
                <div className="help-container mt-10 text-center">
                  <p className="font-medium">Pomoć pri kupovini:</p>
                  <ul className="mt-2">
                    <li>
                      - Ukoliko Vam je potrebna pomoć u svakom trenutku nas
                      možete kontaktirati pozivom na broj call centra{" "}
                      <a href={`tel:${process.env.TELEPHONE}`}>
                        ${process.env.TELEPHONE}
                      </a>
                      .
                    </li>
                    <li>- Pogledajte uputstvo za pomoć pri kupovini.</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div
            className={`mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder`}
          >
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
            <div className={`h-10 w-full bg-slate-300 mt-5`} />
          </div>
        );
    }
  };

  return (
    <>
      {renderCart()}
      {/*{loading && (*/}
      {/*  <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen flex items-center justify-center">*/}
      {/*    <div className="flex flex-col items-center justify-center gap-3">*/}
      {/*      <h1 className="text-xl text-white ">Vaš zahtev se obrađuje...</h1>*/}
      {/*      <i className="fa-solid fa-spinner animate-spin text-6xl text-white"></i>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
};

export default CheckoutPage;
