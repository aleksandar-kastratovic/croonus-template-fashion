import Input from "@/components/Input";
import CheckoutItems from "@/components/Cart/CheckoutItems";
import { Suspense } from "react";

const CheckoutUserInfo = ({
  className,
  formData,
  setFormData,
  items,
  refreshCart,
  errors,
  setErrors,
  refreshSummary,
}) => {
  return (
    <div className={`col-span-2 flex w-full flex-col gap-5 lg:col-span-1`}>
      <div className={`flex w-full flex-col items-center gap-3 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={`${className}`}
          errClassName={` ${
            errors?.includes("first_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          name={`first_name_`}
          title={`Ime`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`last_name_`}
          title={`Prezime`}
          errClassName={` ${
            errors?.includes("last_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-3 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`phone_`}
          title={`Telefon`}
          errClassName={` ${
            errors?.includes("phone_shipping") ? "!border !border-red-500" : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`email_`}
          title={`Email`}
          errClassName={` ${
            errors?.includes("email_shipping") ? "!border !border-red-500" : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-3 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`address_`}
          title={`Adresa`}
          errClassName={` ${
            errors?.includes("address_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`object_number_`}
          title={`Broj`}
          errClassName={` ${
            errors?.includes("object_number_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-3 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`zip_code_`}
          title={`Poštanski broj`}
          errClassName={` ${
            errors?.includes("zip_code_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`town_name_`}
          errClassName={` ${
            errors?.includes("town_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          title={`Grad`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-3 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`note_`}
          title={`Napomena`}
          type={`textarea`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
    </div>
  );
};

export default CheckoutUserInfo;
