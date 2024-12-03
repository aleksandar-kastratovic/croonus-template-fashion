import { currencyFormat } from "@/helpers/functions";

export default function FreeDeliveryScale({ freeDeliveryAmount, cartCost }) {
  const showFreeDeliveryScale =
    process.env.SHOW_FREE_DELIVERY_SCALE === "true" ? true : false;

  return (
    <>
      {showFreeDeliveryScale && freeDeliveryAmount && (
        <div className={`py-5`}>
          <div className={`max-xl:w-full xl:w-[400px] mt-2`}>
            {/*bar for measuring*/}
            <div className="w-full h-1 bg-[#f5f5f7] mt-3">
              <div
                className="h-full relative transition-all duration-500 bg-[#2bc48a]"
                style={{
                  width: `${
                    (cartCost / freeDeliveryAmount) * 100 > 100 ||
                    freeDeliveryAmount === 0
                      ? 100
                      : (cartCost / freeDeliveryAmount) * 100
                  }%`,
                }}
              >
                <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                  <span className="text-black font-bold text-[0.5rem] px-[0.275rem] py-1 bg-white rounded-full border-2 border-[#2bc48a] ">
                    {(cartCost / freeDeliveryAmount) * 100 > 100 ||
                    freeDeliveryAmount === 0
                      ? 100
                      : Math.round((cartCost / freeDeliveryAmount) * 100)}
                    %
                  </span>
                </div>
              </div>
            </div>

            <h1
              className={`text-base text-[#e10000] mt-4 font-bold ${
                cartCost > freeDeliveryAmount ? "hidden" : ""
              }`}
            >
              Do besplatne dostave nedostaje ti još{" "}
              {currencyFormat(freeDeliveryAmount - cartCost)}
            </h1>
          </div>
          {cartCost > freeDeliveryAmount ||
            (freeDeliveryAmount === 0 && (
              <h1 className="text-base text-[#2bc48a] mt-3 font-bold">
                Besplatna dostava
              </h1>
            ))}
        </div>
      )}
    </>
  );
}
