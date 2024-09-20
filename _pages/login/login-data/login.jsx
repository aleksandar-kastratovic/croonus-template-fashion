"use client";
import { useState } from "react";
import { useForm, useLogin } from "@/hooks/ecommerce.hooks";
import {
  Form,
  handleResetErrors,
  handleInputChange,
  handleSubmit,
  handleCheckErrors,
  FormHeader,
} from "@/_components/shared/form";
import { handleOpen } from "@/_pages/login/login-data";
import { ResetPassword } from "@/_pages/login/reset-password";
import { Buttons } from "@/_pages/login/login-data/buttons";
import { CreateAccount } from "@/_pages/login/create-account";
import { icons } from "@/_lib/icons";
import fields from "./fields.json";

export const Login = () => {
  const { data, setErrors, errors, setData } = useForm({
    email: "",
    password: "",
  });

  const [show, setShow] = useState({
    type: "",
    show: false,
  });

  const { mutate: login, isPending } = useLogin();

  const handleModal = (type) => {
    switch (type) {
      case "reset-password":
        return (
          <ResetPassword
            show={show?.show}
            handleOpen={() => {
              handleOpen(setShow, "reset-password");
            }}
          />
        );
      case "create-login-data":
        return (
          <CreateAccount
            show={show?.show}
            handleOpen={() => {
              handleOpen(setShow, "create-login-data");
            }}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className={`container mx-auto px-2 md:px-[2rem] mt-5 md:mt-10`}>
        <div className={`max-w-2xl mx-auto rounded-lg bg-[#f7f7f7] p-5 shadow`}>
          <FormHeader icon={`user`} title={`Prijava na nalog`} />
          <Form
            data={data}
            errors={errors}
            fields={fields}
            isPending={isPending}
            handleSubmit={(e) => {
              handleSubmit(e, data, setData, login, fields, setErrors);
            }}
            setData={setData}
            handleInputChange={(e) => {
              handleInputChange(e, setData, setErrors);
            }}
            showOptions={true}
            button_text={`Prijavite se`}
          />

          <Buttons
            buttons={{
              first: {
                name: "create-login-data",
                text: "Napravite nalog",
              },
              second: {
                name: "reset-password",
                text: "Resetujte lozinku",
              },
            }}
            setData={setData}
            handleOpen={(type) => {
              handleOpen(setShow, type);
              handleResetErrors(setErrors);
            }}
          />
        </div>
      </div>
      {handleModal(show?.type)}
    </>
  );
};
