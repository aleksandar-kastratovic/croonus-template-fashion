"use client";

import { useEffect, useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";

const quantityInputStyle = {
  error: "focus:border-red-600 border-transparent",
  default: "focus:border-black border-transparent",
};

const PlusMinusInput = ({
  quantity,
  maxAmount,
  setQuantity,
  updateCart,
  id,
}) => {
  const [showInputErrorToolTip, setShowInputErrorTooltip] = useState(false);

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
      setShowInputErrorTooltip(false);
      if (inputValue < maxAmount) {
        updateCart({
          id: id,
          quantity: inputValue,
          message: `Uspešno izmenjena količina.`,
        });
      }
    } else {
      setShowInputErrorTooltip(true);
    }
  };

  const onQuantityInputBlur = (e) => {
    const inputValue = e?.target?.value;
    setShowInputErrorTooltip(false);
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
    <div className={`flex w-28 items-stretch rounded-md bg-[#f7f7f7]`}>
      <button
        className={`cursor-pointer text-[0.9rem] flex items-center justify-center w-8 shrink-0`}
        onClick={onMinus}
      >
        <span>-</span>
      </button>
      <Tooltip
        title={"Unesite broj koji je veći od 0"}
        arrow
        open={showInputErrorToolTip}
      >
        <input
          type={`text`}
          className={`w-full ${
            quantityInputStyle[showInputErrorToolTip ? "error" : "default"]
          } bg-inherit text-center border-[1px] py-1 px-1 text-[0.9rem] font-normal focus:outline-none focus:ring-0`}
          value={quantity}
          onChange={onQuantityInputChange}
          onBlur={onQuantityInputBlur}
        />
      </Tooltip>
      <button
        className={`cursor-pointer text-[0.9rem] flex items-center justify-center w-8 shrink-0`}
        onClick={onPlus}
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default PlusMinusInput;
