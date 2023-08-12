import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
import { Suspense } from "react";
import ProductPage from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";

const getProduct = async (slug) => {
  return await get(`/product-details/basic-data/${slug}`).then(
    (res) => res?.payload?.data?.item?.basic_data
  );
};

const getProductGallery = async (slug) => {
  return await get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery[0]?.image
  );
};

export async function generateMetadata({ params: { path } }) {
  const product = await getProduct(path[path?.length - 1]);
  const productImage = await getProductGallery(path[path?.length - 1]);
  return {
    title: product?.name,
    description: product?.short_description ?? "Pazari online Shop",

    openGraph: {
      title: product?.name,
      description: product?.short_description ?? "Pazari online Shop",

      images: [
        {
          url: productImage ?? "",
          width: 800,
          height: 600,
          alt: product?.name ?? "",
        },
      ],

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
}

const ProductDetailPage = ({ params: { path } }) => {
  return (
    <Suspense fallback={<Loader />}>
      <ProductPage path={path[path?.length - 1]} />
    </Suspense>
  );
};

export default ProductDetailPage;
