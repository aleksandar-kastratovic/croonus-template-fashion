import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import { get, list } from "../api/api";
const paymentOptions = async () => {
  const paymentOptions = await get("/checkout/payment-options").then(
    (response) => response?.payload
  );
  return paymentOptions;
};
const deliveryOptions = async () => {
  const deliveryOptions = await get("/checkout/delivery-options").then(
    (response) => response?.payload
  );
  return deliveryOptions;
};

const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then((res) => res?.payload?.items);
};

export const metadata = () => {
  return {
    title: "Korpa - croonus.com - Farmerke, Muške farmerke, Muška odeća",
    description: "Dobrodošli na croonus.com Online Shop",
    keywords: [
      "pazari",
      "online",
      "shop",
      "croonus.com",
      "farmerke",
      "trenerke",
      "dukserice",
      "pazari obuca",
      "obuca",
      "pazari online",
    ],
  };
};
const Cart = async () => {
  const paymentoptions = await paymentOptions();
  const deliveryoptions = await deliveryOptions();
  const recommendedProducts = await getRecommendedProducts();
  
  return (
    <div className="">
      <CheckoutPage
        paymentoptions={paymentoptions}
        deliveryoptions={deliveryoptions}
        recommendedProducts={recommendedProducts}
      />
    </div>
  );
};

export default Cart;

export const revalidate = 30;
