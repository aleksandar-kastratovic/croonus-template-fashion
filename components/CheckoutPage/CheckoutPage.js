"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
import { currencyFormat } from "../../helpers/functions";
import { ToastContainer } from "react-toastify";
import RecommendedCategories from "../RecommendedCategories/RecommendedCategories";


const CheckoutPage = ({ paymentoptions, deliveryoptions, recommendedProducts }) => {
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
    type: "personal",
    areaCode: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    object_number: "",
    address: "",
    zip_code: "",
    town: "",
    note: "",
    company_name: "",
    state: "",
    pib: "",
    maticni_broj: "",
    agreed: null,
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_address: "",
    shipping_object_number: "",
    shipping_zip_code: "",
    shipping_town: "",
    shipping_note: "",
    shipping_company_name: "",
    gcaptcha: token,
    delivery: null,
    payment: null,
    height: "",
    weight: "",
    foot_size: "",
    product_size_agreement: null,
  });

  const required = [
    "first_name",
    "last_name",
    "areaCode",
    "email",
    "phone",
    "address",
    "state",
    "zip_code",
    // "object_number",
    "town",
    // "height",
    // "weight",
    // "product_size_agreement",
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

  const [errors, setErrors] = useState([]);

  const getCart = useCallback(() => {
    list("/cart")
      .then((response) => {
        setCartData(response?.payload);
        setCartLoading(false);
      })
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    getCart();
  }, [getCart, cart]);

  const cartItems = cartData?.items ?? [];
  const cartCost = cartData?.summary?.total ?? 0;

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    if (target.type === "radio" && target.checked) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const formSubmitHandler = () => {
    console.log('test')
    setRefreshReCaptcha((r) => !r);
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (
        (formData.type === "company" &&
          companyrequired.includes(key) &&
          (item === "" || item == null)) ||
        (required.includes(key) && (item === "" || item == null))
      ) {
        if (key.includes("shipping")) {
          if (secondAddress) {
            err.push(key);
          }
        } else {
          err.push(key);
        }
      }
    }
    if (err.length > 0) {
      console.log(err)
      setErrors(err);
    } else {
      const ret = {
        customer_type_billing: formData.type,
        id_company_shipping: null,
        id_company_address_shipping: null,
        company_name_shipping:
          formData.type === "company"
            ? secondAddress
              ? formData.shipping_company_name
              : formData.company_name
            : null,
        pib_shipping: formData.type === "company" ? formData.pib : null,
        maticni_broj_shipping:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_shipping: secondAddress
          ? formData.shipping_first_name
          : formData.first_name,
        last_name_shipping: secondAddress
          ? formData.shipping_last_name
          : formData.last_name,
        phone_shipping: secondAddress
          ? formData.shipping_phone
          :  `${formData?.areaCode} ${formData?.phone}`,
        email_shipping: secondAddress
          ? formData.shipping_email
          : formData.email,
        address_shipping: secondAddress
          ? formData.shipping_address
          : formData.address,
        object_number_shipping: secondAddress
          ? formData.shipping_object_number
          : formData.object_number,
        floor_shipping: "",
        apartment_number_shipping: "",
        id_town_shipping: null,
        town_name_shipping: secondAddress
          ? formData.shipping_town
          : formData.town,
        zip_code_shipping: secondAddress
          ? formData.shipping_zip_code
          : formData.zip_code,
        id_municipality_shipping: null,
        municipality_name_shipping: "",
        id_country_shipping: null,
        country_name_shipping: formData.state,
        note_shipping: secondAddress ? formData.shipping_note : formData.note,
        id_company_billing: null,
        id_company_address_billing: null,
        company_name_billing:
          formData.type === "company" ? formData.company_name : null,
        pib_billing: formData.type === "company" ? formData.pib : null,
        maticni_broj_billing:
          formData.type === "company" ? formData.maticni_broj : null,
        first_name_billing: formData.first_name,
        last_name_billing: formData.last_name,
        phone_billing:  `${formData?.areaCode} ${formData?.phone}`,
        email_billing: formData.email,
        address_billing: formData.address,
        object_number_billing: "",
        floor_billing: "",
        apartment_number_billing: "",
        id_town_billing: null,
        town_name_billing: formData.town,
        zip_code_billing: formData.zip_code,
        id_municipality_billing: null,
        municipality_name_billing: "",
        id_country_billing: null,
        country_name_billing: formData.state,
        note_billing: formData.note,
        delivery_method: formData.delivery,
        delivery_method_options: [],
        payment_method: formData.payment,
        payment_method_options: [],
        promo_code: null,
        promo_code_options: [],
        note:formData.note,
        gcaptcha: token,
        accept_rules: 1,
      };
      if (errors.length === 0) {
        setLoading(true);
      }

      post("/checkout/one-page", ret)
        .then((response) => {
          const creditCardForm = response?.payload?.payment_provider_data?.form;
          const orderToken = response?.payload?.order?.order_token;
          if (response?.code === 200) {
            if (creditCardForm) {
              const dom = document.createElement("div");
              dom.innerHTML = creditCardForm;
              document.body.appendChild(dom);
              setLoading(false);

              const formData = document.getElementById("bank_send_form");
              formData.submit();
              mutateCart();
            } else {
              router.push(`/korpa/${orderToken}`);

              mutateCart();
              setLoading(false);
            }
          } else {
            return (
              <div className="flex flex-row items-center justify-center rounded-2xl border border-croonus-1">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-medium">Greška</h1>
                  <p className="text-base">
                    Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.
                  </p>
                </div>
              </div>
            );
          }
        })
        .catch((error) => console.warn(error));
    }
  };
  const [checkoutSummary, setCheckoutSummary] = useState([]);

  useEffect(() => {
    const getSummary = async () => {
      return await get(`/checkout/summary`).then((response) => {
        setCheckoutSummary(response?.payload);
      });
    };
    getSummary();
  }, [cartItems]);
  
  console.log(formData.agreed)
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <ToastContainer />
      <div className="mx-auto text-sm 4xl:container mt-0 lg:mt-12 placeholder">
        <div className="md:hidden bg-[#f5f5f6]">
          <div className="font-semibold py-3  text-xl w-[85%] mx-auto">
            Korpa
          </div>
        </div>
        {cartItems.length > 0 && !cartLoading ? (
          <>
            <div className="grid grid-cols-5 gap-y-3 max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem] gap-x-16 mt-10 lg:mt-0">
              <div className="col-span-5 bg-white pb-6 xl:pb-12 xl:col-span-3 max-xl:row-start-1">
                <h1 className="text-[18px] font-bold mb-[35px]">Informacije za dostavu</h1>
                {formData.type === "personal" && (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-x-6 pb-6 max-xl:text-base">
                      <div className="flex flex-col gap-2 xl:gap-6 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="hidden">
                            Ime:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px] placeholder:text-black ${
                              errors.includes("first_name")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7]`}
                            type="text"
                            id="name"
                            name="first_name"
                            placeholder="Ime*"
                            value={formData.first_name}
                            onChange={formChangeHandler}
                          />
                        </div>

                        <div className="grid xl:grid-cols-2 gap-2 xl:gap-x-3">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="areaCode" className="hidden">
                              Pozivni broj:
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="areaCode"
                              id="areaCode"
                              value={formData.areaCode}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px] placeholder:text-black  ${
                                errors.includes("areaCode")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7]`}
                              placeholder="Pozivni broj*"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="hidden">
                              Telefon{" "}
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                                errors.includes("phone")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7]`}
                              placeholder="Broj*"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address" className="hidden">
                              Adresa za dostavu:
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={formData.address}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                                errors.includes("address")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7]`}
                              placeholder="Adresa za dostavu*"
                            />
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <label htmlFor="zip_code" className="hidden">
                              Poštanski broj:
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="zip_code"
                              id="zip_code"
                              value={formData.zip_code}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                                errors.includes("zip_code")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7]`}
                              placeholder="Poštanski broj*"
                            />
                          </div>
                      </div>
                      <div className="flex flex-col gap-2 xl:gap-6 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                          <label htmlFor="surname" className="hidden">
                            Prezime:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                              errors.includes("last_name")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7]`}
                            type="text"
                            id="surname"
                            name="last_name"
                            placeholder="Prezime*"
                            value={formData.last_name}
                            onChange={formChangeHandler}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="hidden">
                            Email:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={formChangeHandler}
                            className={` h-[58px]  max-sm:text-sm placeholder:text-black ${
                              errors.includes("email")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7]`}
                            placeholder="Email*"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <label htmlFor="state" className="hidden">
                            Država:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={formChangeHandler}
                            className={` h-[58px] max-sm:text-sm placeholder:text-black ${
                              errors.includes("state")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7]`}
                            placeholder="Država*"
                          />
                        </div>
                       
                        <div className="flex flex-col gap-2">
                          <label htmlFor="town" className="hidden">
                            Grad:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="town"
                            id="town"
                            value={formData.town}
                            onChange={formChangeHandler}
                            className={` h-[58px] max-sm:text-sm placeholder:text-black ${
                              errors.includes("town")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7]`}
                            placeholder="Grad*"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                          <label htmlFor="note" className="hidden">
                            Napomena:
                          </label>
                          <textarea
                            type="text"
                            name="note"
                            rows="7"
                            id="note"
                            value={formData.note}
                            onChange={formChangeHandler}
                            className=" max-sm:text-sm placeholder:text-black border-none focus:border-none focus:ring-0 bg-[#f5f5f7]"
                            placeholder="Napomena"
                          />
                    </div>
                  </>
                )}
                {/* {formData.type === "company" && (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-x-10 pb-4 max-xl:text-base border-b">
                      <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="company_name" className="hidden">
                            Naziv firme:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="company_name"
                            id="company_name"
                            value={formData.company_name}
                            onChange={formChangeHandler}
                            className={` max-sm:text-sm h-[58px] placeholder:text-black ${
                              errors.includes("company_name")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            placeholder="Naziv firme*"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="pib" className="hidden">
                            PIB:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                              errors.includes("pib")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            type="text"
                            name="pib"
                            id="pib"
                            value={formData.pib}
                            onChange={formChangeHandler}
                            placeholder="PIB*"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="maticni_broj" className="hidden">
                            Matični broj:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                              errors.includes("maticni_broj")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            type="text"
                            name="maticni_broj"
                            id="maticni_broj"
                            value={formData.maticni_broj}
                            onChange={formChangeHandler}
                            placeholder="Matični broj*"
                          />
                        </div>
                        <div className="flex flex-col gap-2  ">
                          <label htmlFor="name" className="hidden">
                            Ime:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                              errors.includes("first_name")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            type="text"
                            id="name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={formChangeHandler}
                            placeholder="Ime*"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="surname" className="hidden">
                            Prezime:{" "}
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                              errors.includes("last_name")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            type="text"
                            id="surname"
                            name="last_name"
                            value={formData.last_name}
                            onChange={formChangeHandler}
                            placeholder="Prezime*"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
                        <div className="flex flex-col gap-2 max-xl:mt-2">
                          <label htmlFor="email" className="hidden">
                            Email:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={formChangeHandler}
                            className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                              errors.includes("email")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            placeholder="Email*"
                          />
                        </div>
                        <div className="flex flex-col gap-2 max-xl:mt-2">
                          <label htmlFor="phone" className="hidden">
                            Telefon:
                            <span className="snap-mandatory text-red-500">
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={formChangeHandler}
                            className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                              errors.includes("phone")
                                ? "border-red-500 focus:border-red-500"
                                : "border-none focus:border-none"
                            }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                            placeholder="Telefon*"
                          />
                        </div>
                        <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                       
                          <div className="flex flex-col gap-2 max-xl:mt-2">
                            <label htmlFor="object_number" className="hidden">
                              Broj{" "}
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="object_number"
                              id="object_number"
                              value={formData.object_number}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                                errors.includes("object_number")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                              placeholder="Broj*"
                            />
                          </div>
                        </div>
                        <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                          <div className="flex flex-col gap-2 max-xl:mt-2">
                            <label htmlFor="zip_code" className="hidden">
                              Poštanski broj:
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="zip_code"
                              id="zip_code"
                              value={formData.zip_code}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                                errors.includes("zip_code")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                              placeholder="Poštanski broj*"
                            />
                          </div>
                          <div className="flex flex-col gap-2 max-xl:mt-2">
                            <label htmlFor="town" className="hidden">
                              Grad{" "}
                              <span className="snap-mandatory text-red-500">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              name="town"
                              id="town"
                              value={formData.town}
                              onChange={formChangeHandler}
                              className={` max-sm:text-sm h-[58px]   placeholder:text-black ${
                                errors.includes("town")
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-none focus:border-none"
                              }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                              placeholder="Grad*"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="note" className="hidden">
                            Napomena:
                          </label>
                          <textarea
                            type="text"
                            name="note"
                            rows="2"
                            id="note"
                            value={formData.note}
                            onChange={formChangeHandler}
                            className=" max-sm:text-sm placeholder:text-black border-none focus:border-none focus:ring-none bg-[#f5f5f7] max-xl:mx-3"
                            placeholder="Napomena"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`grid max-xl:grid-cols-1 grid-cols-2 gap-x-10 gap-y-5 pb-4 mt-5 xl:mt-[0.7rem]`}
                    >
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="height" className="text-[14px] ">
                          Molimo unesite Vašu visinu
                        </label>
                        <input
                          type="text"
                          name="height"
                          id="height"
                          value={formData.height}
                          onChange={formChangeHandler}
                          className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                            errors.includes("height")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                          placeholder="Visina*"
                        />
                      </div>{" "}
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="weight" className="text-[14px] ">
                          Molimo unesite Vašu težinu
                        </label>
                        <input
                          type="text"
                          name="weight"
                          id="weight"
                          value={formData.weight}
                          onChange={formChangeHandler}
                          className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                            errors.includes("weight")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                          placeholder="Težina*"
                        />
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="foot_size" className="text-[14px] ">
                          U slučaju da kupujete neki model od naše obuće molimo
                          unesite Vašu dužinu gazišta u centimetrima (opciono)
                        </label>
                        <input
                          type="text"
                          name="foot_size"
                          id="foot_size"
                          value={formData.foot_size}
                          onChange={formChangeHandler}
                          className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                            errors.includes("foot_size")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                          placeholder="Gazište"
                        />
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="foot_size" className="text-[14px] ">
                          Da li ste saglasni da pošaljemo veličinu proizvoda
                          shodno Vašoj visini i težini koju ste naveli?
                        </label>
                        <select
                          name="product_size_agreement"
                          id="product_size_agreement"
                          value={formData.product_size_agreement}
                          onChange={formChangeHandler}
                          className={` max-sm:text-sm h-[58px]  placeholder:text-black ${
                            errors.includes("product_size_agreement")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-[#f5f5f7] max-xl:mx-3`}
                        >
                          <option value="">Izaberite</option>
                          <option value={true}>Da</option>
                          <option value={false}>Ne</option>
                        </select>
                      </div>
                    </div>
                  </>
                )} */}
              </div>
              {cartItems.length > 0 && (
                <>
                  <div className="flex flex-col max-md:mt-0 col-span-3 row-start-2 max-xl:col-span-5 gap-y-8 mt-7">
                    <span className="text-[18px] font-bold ">Način dostave </span>
                    <div className="bg-[#f5f5f7] lg:pl-9 pb-12 pt-10 lg:pr-32 pl-5 pr-5">
                      <div className="flex flex-col gap-2 relative">
                        {errors.includes("delivery") && (
                          <span
                            className={`${classes.errorMsg} absolute -top-5 text-red-500`}
                          >
                            {errorSelect}
                          </span>
                        )}
                        <div className="flex flex-col gap-1 max-xl:text-sm">
                          {deliveryoptions.map((option) => (
                            <div
                              className="flex flex-row items-center gap-1"
                              key={option.type}
                            >
                              <input
                                type="radio"
                                name="delivery"
                                value={option.id}
                                id={"delivery" + option.id}
                                onChange={formChangeHandler}
                                className="h-3 w-3 focus:ring-0 focus:outline-none focus:border-none text-[#171717]"
                              />
                              <label htmlFor={"delivery" + option.id}>
                                {option.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <p className='text-[#171717] mt-14 text-[15px]'>
                        Poštovani kupci, trenutna organizacija poslovanja našim kupcima nudi dostavu na željenu adresu 
                        u najkraćem vremenskom periodu. Zamenu robe možete izvršiti u bilo kojoj maloprodaji. 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col col-span-3  max-xl:col-span-5 gap-y-4 mt-7 row-start-3">
                  <span className="text-[18px] font-bold ">
                      Način plaćanja:
                    </span>
                    <div className="bg-[#f5f5f7] pt-7 lg:pl-9 pl-5 pb-7 ">
                      <div className="flex flex-col gap-2 relative">
                        {errors.includes("payment") && (
                          <span
                            className={`${classes.errorMsg} absolute -top-5 text-red-500`}
                          >
                            {errorSelect}
                          </span>
                        )}
                        <div className="flex flex-col gap-1">
                          {(paymentoptions ?? []).map((option) => (
                            <div
                              className="flex flex-row items-center gap-1 text-sm xl:text-sm"
                              key={option.id}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={option.id}
                                id={"payment" + option.id}
                                onChange={formChangeHandler}
                                className="h-3 w-3 focus:ring-0 focus:outline-none focus:border-none text-[#191919]"
                              />
                              <label htmlFor={"payment" + option.id}>
                                {option.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="overflow-y-auto max-xl:max-h-[411px] max-h-[570px] col-span-5 row-span-3  bg-white xl:col-start-4 xl:col-end-6 xl:row-start-1 lg:row-start-4 mt-7 lg:mt-0">
                <span className="font-bold text-[18px]">Proizvodi u korpi</span>
                <CartProductBox cartItems={cartItems} />
              </div>
              
              <div className="flex flex-col max-md:mt-5  xl:row-start-2  max-xl:col-span-5 col-start-4 col-end-6 gap-8 mt-7 row-start-4">
                    <span className="text-[18px] font-bold ">
                      Kupon:
                    </span>
                <div className="bg-[#f5f5f7] py-5 px-5 lg:px-7 flex flex-col gap-y-6">
                  <input
                    id="coupon"
                    type="text"
                    placeholder="Ovde unesite kupon"
                    className="h-[62px] border-none  w-full placeholder:text-[#171717] placeholder:text-base bg-white px-6"
                  />
                <button className='self-start text-[#171717] pl-5'>
                *Uputstvo za upotrebu kupona.
                  </button>
                    <button className="h-[47px] max-xl:w-full w-1/2 placeholder:text-black bg-[#2bc48a] font-medium text-white self-end uppercase">
                      Aktiviraj kupon
                    </button>
              
                  </div>
              </div>
            
              <div className="flex flex-col max-md:mt-5  xl:row-start-3  max-xl:col-span-5 col-start-4 col-end-6 gap-4 mt-7 row-start-5">
                <span className=" text-[18px]  font-bold ">
                  Vrednost Vaše korpe:
                </span>
                <div className="flex flex-col gap-2 bg-[#f5f5f7] max-sm:px-[0.45rem] sm:px-3 mt-0 pt-7 pb-5">
                  <div className="flex flex-row items-center justify-between border-b-[1px] border-b-slate-100 py-1 max-xl:text-base">
                    <span className="text-sm  font-medium max-xl:text-sm">
                      Ukupna vrednost korpe bez popusta:{" "}
                    </span>
                    <span className="sm:mr-3 text-sm max-sm:ml-auto font-medium max-xl:text-sm">
                      {currencyFormat(
                        checkoutSummary?.summary?.totals?.with_vat
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between border-b-[1px] border-b-slate-100 py-1 max-xl:text-base">
                    <span className="text-sm font-medium max-xl:text-sm">
                      Iznos popusta u korpi:{" "}
                    </span>
                    <span className="sm:mr-3 text-sm font-medium max-xl:text-sm">
                      {currencyFormat(
                        checkoutSummary?.summary?.totals
                          ?.items_discount_amount +
                          checkoutSummary?.summary?.totals?.cart_discount_amount
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between border-b-[1px] border-b-slate-100 py-1">
                    <span className="text-sm font-medium max-xl:text-sm">
                      Ukupna vrednost korpe sa popustom:
                    </span>
                    <span className="sm:mr-3 text-sm max-sm:ml-auto font-medium max-xl:text-sm">
                      {currencyFormat(
                        checkoutSummary?.summary?.totals?.cart_discount
                      )}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between border-b-[1px] border-b-slate-100 py-1">
                    <span className="text-sm font-medium max-xl:text-sm">
                      Iznos koštanja transporta:{" "}
                    </span>
                    <span className="sm:mr-3 text-sm font-medium max-xl:text-sm">
                      {currencyFormat(
                        checkoutSummary?.summary?.totals?.delivery_amount
                      )}
                    </span>
                  </div>
                  <div className="flex mt-5 flex-row items-center justify-between border-b-[1px] border-b-slate-100 py-1">
                    <span className="text-sm font-medium max-xl:text-sm">
                      Ukupno za naplatu:
                    </span>
                    <span className="sm:mr-3 text-[1.5rem] font-bold max-xl:text-sm">
                      {currencyFormat(checkoutSummary?.summary?.totals?.total)}
                    </span>
                  </div>{" "}
                </div>
              </div>
              </div>
               
              <div className="flex flex-col max-md:items-center max-md:justify-center items-end justify-end max-md:w-[95%] max-md:mx-auto md:mx-[5rem]">
              <div className="mt-2 flex gap-3 py-3 relative">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  onChange={formChangeHandler}
                  value={formData.agreed === "1" ? "" : "1"}
                  className="focus:ring-0 focus:border-none focus:outline-none text-[#191919] bg-[#191919]"
                />
                <label htmlFor="agreed" className="max-md:text-xs">
                  Saglasan sam sa{" "}
                  <a
                    className={`text-[#e10000] underline`}
                    href={`/uslovi-koriscenja`}
                    target={`_blank`}
                  >
                    opštim uslovima korišćenja
                  </a>{" "}
                 {process.env.NEXT_PUBLIC_COMPANY_NAME}
                </label>
                {errors.includes("agreed") && (
                  <span
                    className={`${classes.errorMsg} text-red-500 -top-3.5 absolute `}
                  >
                    {errorCheck}
                  </span>
                )}
                <br />
              </div>
              <button
                onClick={formSubmitHandler}
                className="max-xl:w-full xl:w-[400px] border uppercase bg-[#2bc48a] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Potvrdi porudžbenicu{" "}
              </button>

              <div className={`max-xl:w-full xl:w-[400px] ml-auto mt-2`}>
                {/*bar for measuring*/}
                <div className="w-full h-1 bg-[#f5f5f7] mt-3">
                  <div
                    className="h-full relative transition-all duration-500 bg-[#2bc48a]"
                    style={{
                      width: `${
                        (checkoutSummary?.summary?.totals?.items_discount /
                          6000) *
                          100 >
                        100
                          ? 100
                          : (checkoutSummary?.summary?.totals?.items_discount /
                              6000) *
                            100
                      }%`,
                    }}
                  >
                    <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                      <span className="text-black font-bold text-[0.5rem] px-[0.275rem] py-1 bg-white rounded-full border-2 border-[#2bc48a] ">
                        {checkoutSummary?.summary?.totals?.items_discount > 6000
                          ? 100
                          : Math.round(
                              (checkoutSummary?.summary?.totals
                                ?.items_discount /
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
                    checkoutSummary?.summary?.totals?.items_discount > 6000
                      ? "hidden"
                      : ""
                  }`}
                >
                  Do besplatne dostave nedostaje ti još{" "}
                  {currencyFormat(
                    6000 - checkoutSummary?.summary?.totals?.items_discount
                  )}
                </h1>
              </div>

              {cartCost > 6000 && (
                <h1 className="text-base text-[#2bc48a] mt-3 font-bold">
                  Besplatna dostava
                </h1>
              )}
            </div>
            <RecommendedCategories products={recommendedProducts} />
          </>
        ) : (
          !cartLoading && (
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
          )
        )}
        {loading && (
          <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-xl text-white ">Vaš zahtev se obrađuje...</h1>
              <i className="fa-solid fa-spinner animate-spin text-6xl text-white"></i>
            </div>
          </div>
        )}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default CheckoutPage;
