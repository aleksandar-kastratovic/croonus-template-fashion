import CheckoutTotals from "@/components/Cart/CheckoutTotals";
import { useCheckout } from "@/hooks/ecommerce.hooks";
import Spinner from "@/components/UI/Spinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CheckoutOptions = ({
  formData,
  setFormData,
  className,
  paymentoptions,
  deliveryoptions,
  options,
  summary,
  totals,
  errors,
  setErrors,
}) => {
  return (
    <>
      <div className={`col-span-2 lg:col-span-1`}>
        <div className={`flex flex-col gap-5`}>
          <div className={`bg-[#f7f7f7] p-3`}>
            <h3
              className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline ${
                errors?.includes("delivery_method") ? `text-red-500` : ``
              }`}
            >
              ODABERITE NAČIN DOSTAVE
            </h3>
            {deliveryoptions?.map(({ id, name }) => {
              return (
                <div className={`flex items-center gap-3 pl-2.5`} key={id}>
                  <input
                    type={`radio`}
                    className={`cursor-pointer  text-black focus:text-black focus:outline-none focus:ring-0`}
                    name={`delivery_method`}
                    id={`delivery_method_${id}`}
                    value={id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        delivery_method: e.target.value,
                      });
                      setErrors(
                        errors?.filter((error) => error !== "delivery_method"),
                      );
                    }}
                  />
                  <label
                    htmlFor={`delivery_method_${id}`}
                    className={`cursor-pointer text-[0.965rem] font-light ${className}`}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className={`bg-[#f7f7f7] p-3`}>
            <h3
              className={`pb-4 text-[0.965rem] font-light ${className} uppercase underline ${
                errors?.includes("payment_method") ? `text-red-500` : ``
              }`}
            >
              ODABERITE NAČIN PLAĆANJA
            </h3>
            {paymentoptions?.map(({ id, name, type }) => {
              return (
                <div className={`flex items-center gap-3 pl-2.5`} key={id}>
                  <input
                    type={`radio`}
                    className={`cursor-pointer text-black focus:text-black focus:outline-none focus:ring-0`}
                    name={`payment_method`}
                    id={`payment_method_${id}`}
                    value={id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        payment_method: e.target.value,
                      });
                      setErrors(
                        errors?.filter((error) => error !== "payment_method"),
                      );
                    }}
                  />
                  <label
                    htmlFor={`payment_method_${id}`}
                    className={`cursor-pointer text-[0.965rem] font-light ${className}`}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutOptions;
