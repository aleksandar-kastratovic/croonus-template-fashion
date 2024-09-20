"use client";

import { SectionHeader } from "@/_pages/account/account-data/shared/section-header";
import {
  useDeleteAccountData,
  useForm,
  useGetAccountData,
  useUpdateAccountData,
} from "@/hooks/ecommerce.hooks";
import { Modal } from "@/_components/shared/modal";
import { useEffect, useState } from "react";
import { handleInputChange, handleSubmit } from "@/_components/shared/form";
import { Table } from "@/_pages/account/account-data/shared";
import { useRouter } from "next/navigation";
import fields from "./fields.json";
import tableFields from "./tableFields.json";

export const Payments = () => {
  const { data: billing_addresses, refetch } = useGetAccountData(
    `/customers/billing-address`,
    "list"
  );

  const { data: new_address } = useGetAccountData(
    `/customers/billing-address/new`,
    "get"
  );

  const {
    mutate: addNewAddress,
    isPending,
    isSuccess: isAdded,
  } = useUpdateAccountData(
    `/customers/billing-address`,
    `Uspešno ste dodali novu adresu plaćanja.`
  );

  const { mutate: deleteAddress, isSuccess: isDeleted } = useDeleteAccountData(
    `/customers/billing-address`,
    `customers/billing-address`,
    `Uspešno ste obrisali adresu plaćanja.`
  );

  const { data, setData, errors, setErrors } = useForm({
    ...new_address,
    set_default: false,
  });

  const [show, setShow] = useState({
    show: false,
    button: "Dodajte novu adresu",
    title: "Dodajte novu adresu",
    description: "Popunjavajem forme ispod možete dodati novu adresu plaćanja.",
  });

  const formatFields = (fields, data) => {
    if (data && Number(data?.id_country) === 193) {
      return fields?.map((field) => {
        if (field?.name === "town_name") {
          return {
            ...field,
            name: "id_town",
            type: "select",
            fill: `/customers/billing-address/ddl/id_town?id_country=${data?.id_country}`,
          };
        }
        return field;
      });
    }
    return fields;
  };

  useEffect(() => {
    if (isAdded || isDeleted) {
      setShow(false);
      refetch();
    }
  }, [isAdded, isDeleted]);

  return (
    <>
      <SectionHeader
        title={"Adrese plaćanja"}
        description={"Ovde možete videti sve vaše adrese plaćanja."}
        icon={`plus`}
        button={`Dodajte novu adresu`}
        onClick={() => {
          setShow({
            ...show,
            show: true,
          });
        }}
      />
      <Table
        data={billing_addresses}
        fields={tableFields}
        onClick={(action, row) => {
          if (action === "edit") {
            setData(row);
            setShow({
              title: "Izmenite adresu",
              button: "Izmenite adresu",
              description: `Popunjavajem forme ispod možete izmeniti adresu plaćanja.`,
              show: true,
            });
          } else {
            deleteAddress(row);
          }
        }}
      />
      <Modal
        data={data}
        errors={errors}
        fields={formatFields(fields, data)}
        isPending={isPending}
        setData={setData}
        handleOpen={() =>
          setShow({
            ...show,
            show: !show.show,
          })
        }
        show={show?.show}
        className={`grid grid-cols-2 gap-x-5`}
        setErrors={setErrors}
        showOptions={false}
        handleInputChange={(e) => {
          handleInputChange(e, setData, setErrors);
        }}
        handleSubmit={(e) => {
          handleSubmit(
            e,
            data,
            setData,
            addNewAddress,
            formatFields(fields, data),
            setErrors
          );
        }}
        button_text={show?.button}
        title={show?.title}
        description={
          show?.description
            ? show?.description
            : `Popunjavajem forme ispod možete dodati novu adresu plaćanja.`
        }
      />
    </>
  );
};
