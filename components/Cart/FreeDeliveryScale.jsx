import { currencyFormat } from "@/helpers/functions";

/**
 * Calculates the data needed to display a free delivery scale, based on the cart cost and free delivery threshold.
 *
 * @param {number} cartCost - The current cost of items in the cart.
 * @param {number} freeDeliveryAmount - The minimum amount required for free delivery.
 * @returns {Object} An object containing information about the free delivery scale.
 * @property {boolean} show - Whether the free delivery scale should be displayed.
 * @property {number} percent - The percentage of progress towards free delivery, capped at 100.
 * @property {string} text - The message to display regarding free delivery status.
 * @property {boolean} freeDelivery - Indicates whether free delivery has been achieved.
 * @property {number|string} remainingCost - The formatted remaining cost needed for free delivery (or 0 if achieved).
 *
 * @example
 * const result = calcFreeDeliveryScaleData(50, 100);
 * // result:
 * // {
 * //   show: true,
 * //   percent: 50,
 * //   text: "Do besplatne dostave nedostaje ti još",
 * //   freeDelivery: false,
 * //   remainingCost: "50.00", // Assuming currencyFormat formats to "50.00"
 * // }
 */
const calcFreeDeliveryScaleData = (cartCost, freeDeliveryAmount) => {
  const data = {
    show: process.env.SHOW_FREE_DELIVERY_SCALE === "true" ? true : false,
    percent: Math.min(Math.round((cartCost / freeDeliveryAmount) * 100), 100),
    text: "Besplatna dostava",
    freeDelivery: true,
    remainingCost: 0,
  };

  if (data.percent < 100) {
    data.text = "Do besplatne dostave nedostaje ti još";
    data.freeDelivery = false;
    data.remainingCost = currencyFormat(freeDeliveryAmount - cartCost);
  }

  return data;
};

export default function FreeDeliveryScale({ freeDeliveryAmount, cartCost }) {
  const data = calcFreeDeliveryScaleData(cartCost, freeDeliveryAmount);
  return (
    <>
      {data.show && (
        <div className={`py-5`}>
          <div className={`max-xl:w-full xl:w-[400px] mt-2`}>
            {/*bar for measuring*/}
            <div className="w-full h-1 bg-[#f5f5f7] mt-3">
              <div
                className="h-full relative transition-all duration-500 bg-[#2bc48a]"
                style={{
                  width: `${data.percent}%`,
                }}
              >
                <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                  <span className="text-black font-bold text-[0.5rem] px-[0.275rem] py-1 bg-white rounded-full border-2 border-[#2bc48a] ">
                    {data.percent}%
                  </span>
                </div>
              </div>
            </div>
            <h1
              className={`text-base text-[#e10000] mt-4 font-bold ${
                data.freeDelivery ? "hidden" : ""
              }`}
            >
              {data.text} {data.remainingCost}
            </h1>
          </div>
          {data.freeDelivery && (
            <h1 className="text-base text-[#2bc48a] mt-3 font-bold">
              {data.text}
            </h1>
          )}
        </div>
      )}
    </>
  );
}
