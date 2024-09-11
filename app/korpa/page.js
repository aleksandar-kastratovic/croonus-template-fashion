import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import { get, list } from "@/api/api";
import { Suspense } from "react";
import { headers } from "next/headers";

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
  return await list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};

const getCountries = async () => {
  return await get(`/checkout/ddl/id_country`).then((res) => res?.payload);
};

const Cart = async () => {
  const paymentoptions = await paymentOptions();
  const deliveryoptions = await deliveryOptions();
  const recommendedProducts = await getRecommendedProducts();
  const countries = await getCountries();
  return (
    <div className="">
      <CheckoutPage
        paymentoptions={paymentoptions}
        deliveryoptions={deliveryoptions}
        recommendedProducts={recommendedProducts}
        countries={countries}
      />
    </div>
  );
};

export default Cart;

export const revalidate = 30;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Korpa | Fashion Template`,
    description: "Dobrodošli na Fashion Template Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Korpa | Fashion Template`,
      description: "Dobrodošli na Fashion Template Online Shop",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Fashion Template",
        },
      ],
      locale: "sr_RS",
    },
  };
};
