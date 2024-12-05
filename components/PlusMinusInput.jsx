"use client";

import { useEffect, useId, useRef, useState } from "react";
import { toast } from "react-toastify";

const PlusMinusInput = ({
  className,
  quantity,
  maxAmount,
  setQuantity,
  updateCart,
  id,
}) => {
  const quantityErrorMessageId = useId();
  const showQuantitiyError = () => {
    if (!toast.isActive(quantityErrorMessageId)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: quantityErrorMessageId,
      });
    }
  };

  const onPlus = () => {
    if (quantity < maxAmount) {
      setQuantity(quantity + 1);
      updateCart({
        id: id,
        quantity: quantity + 1,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
    } else {
      showQuantitiyError();
    }
  };

  const onQuantityInputChange = (e) => {
    const inputValue = e?.target?.value
      ?.replace(/[^0-9.]/g, "")
      .replace(/^0+/, "");
    setQuantity(inputValue);
    if (inputValue && quantity !== inputValue) {
      if (inputValue < maxAmount) {
        updateCart({
          id: id,
          quantity: inputValue,
          message: `Uspešno izmenjena količina.`,
        });
      }
    }
  };

  const onQuantityInputBlur = (e) => {
    const inputValue = e?.target?.value;
    if (inputValue === "") {
      setQuantity(1);
    }
  };

  const onMinus = () => {
    if (quantity > 1 && quantity <= maxAmount) {
      setQuantity(quantity - 1);
      updateCart({
        id: id,
        quantity: quantity - 1,
        message: `Uspešno izmenjena količina.`,
        type: true,
      });
    }
  };

  useEffect(() => {
    if (quantity > maxAmount && maxAmount > 0) {
      setQuantity(maxAmount);
      showQuantitiyError();
    }
  }, [quantity]);

  return (
    <div
      className={`${className} flex max-w-[6.25rem] items-center gap-2 rounded-md bg-[#f7f7f7] px-3`}
    >
      <span
        className={`cursor-pointer text-[0.9rem] ${className}`}
        onClick={onMinus}
      >
        -
      </span>
      <input
        type={`text`}
        className={`w-full bg-inherit !p-0 text-center ${className} border-none text-[0.9rem] font-normal focus:border-none focus:outline-none focus:ring-0`}
        value={quantity}
        onChange={onQuantityInputChange}
        onBlur={onQuantityInputBlur}
      />
      <span
        className={`cursor-pointer text-[0.9rem] ${className}`}
        onClick={onPlus}
      >
        +
      </span>
    </div>
  );
};

export default PlusMinusInput;
