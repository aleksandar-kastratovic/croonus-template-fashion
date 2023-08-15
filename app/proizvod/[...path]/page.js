import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
import { Suspense } from "react";
import ProductPage from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";

const ProductDetailPage = async ({ params: { path } }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductPage path={path[path?.length - 1]} />
    </Suspense>
  );
};

export default ProductDetailPage;

export const generateMetadata = async ({ params: { path } }) => {
  const getProduct = async (slug) => {
    return await get(`/product-details/basic-data/${slug}`).then((res) => {
      return res?.payload?.data?.item?.basic_data;
    });
  };
  const product = await getProduct(path[path?.length - 1]);
  // const productImage = await getProductGallery(path[path?.length - 1]);
  return {
    title: product?.name,
    description: product?.short_description ?? "Pazari online Shop",

    openGraph: {
      title: product?.name,
      description: product?.short_description ?? "Pazari online Shop",
      site_name: "Pazari.rs",
    },

    twitter: {
      handle: "@pazarirs",
      site: "@pazarirs",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
          "pazari",
          "online",
          "shop",
          "pazari.rs",
          "farmerke",
          "trenerke",
          "dukserice",
          "pazari obuca",
          "obuca",
          "pazari online",
        ].join(", "),
      },
    ],
  };
};
