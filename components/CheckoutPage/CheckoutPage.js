"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CheckoutData from "../Cart/CheckoutData";

const CartProductBox = dynamic(
  () => import("../../components/CartProductBox"),
  { loading: () => <p>Loading...</p> }
);
import { useCartContext } from "@/app/api/cartContext";
import { useRouter } from "next/navigation";
import { get, list, post } from "@/app/api/api";
import classes from "./Cart.module.css";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
import { currencyFormat } from "@/helpers/functions";
import { Breadcrumb } from "rsuite";
import GenerateBreadCrumbsServer from "../../helpers/generateBreadCrumbsServer";
import { ToastContainer, toast } from "react-toastify";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import { useCart, useSummary } from "@/hooks/ecommerce.hooks";

const CheckoutPage = ({
  paymentoptions,
  deliveryoptions,
  recommendedProducts,
  countries,
  className,
}) => {
  const router = useRouter();
  const { asPath } = router;
  function handleClick() {
    router.back();
  }
  const [cart, mutateCart] = useCartContext();
  const [cartData, setCartData] = useState([]);
  const [secondAddress, setSecondAddress] = useState(false);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

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
    delivery_method: "",
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

  const required = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "address",
    "zip_code",
    "object_number",
    "town",
    "agreed",
    "shipping_first_name",
    "shipping_last_name",
    "shipping_email",
    "shipping_phone",
    "shipping_address",
    "shipping_object_number",
    "shipping_address",
    "shipping_zip_code",
    "shipping_town",
    "delivery",
    "payment",
    "id_country_shipping",
  ];

  const companyrequired = [
    "company_name",
    "pib",
    "maticni_broj",
    "shipping_company_name",
  ];

  const errorMsg = "Polje je obavezno";
  const errorSelect = "Morate izabrati jednu opciju";
  const errorCheck = "Morate prihvatiti uslove";

  //fetchujemo sve artikle iz korpe
  const { data: items, refetch: refreshCart, isFetching } = useCart();

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const { data, refetch: refreshSummary } = useSummary({
    items: items?.items?.map((item) => {
      return Number(item?.cart?.quantity);
    }),
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

                    <h1 className="text-xl   font-bold ">Informacije</h1>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      className={`mt-20 grid grid-cols-5 gap-[3.75rem]`}
                    >
                      <CheckoutData
                        setFormData={setFormData}
                        formData={formData}
                        className={className}
                        deliveryoptions={deliveryoptions}
                        paymentoptions={paymentoptions}
                        items={items?.items}
                        refreshSummary={refreshSummary}
                        summary={data?.summary}
                        options={data?.summary?.options}
                        totals={data?.summary?.totals}
                        refreshCart={refreshCart}
                        errors={errors}
                        setErrors={setErrors}
                      />
                    </form>
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
    }
  };

  return (
    <>
      {renderCart()}
      {loading && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-xl text-white ">Vaš zahtev se obrađuje...</h1>
            <i className="fa-solid fa-spinner animate-spin text-6xl text-white"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
