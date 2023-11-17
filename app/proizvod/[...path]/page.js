import { get } from "@/app/api/api";
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
    description: product?.short_description ?? "Croonus online Shop",

    openGraph: {
      title: product?.name,
      description: product?.short_description ?? "Croonus online Shop",
      site_name: "croonus.com",
    },

    twitter: {
      handle: "@Croonusrs",
      site: "@Croonusrs",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
          "Croonus",
          "online",
          "shop",
          "croonus.com",
          "farmerke",
          "trenerke",
          "dukserice",
          "Croonus obuca",
          "obuca",
          "Croonus online",
        ].join(", "),
      },
    ],
  };
};

// export async function generateStaticParams() {
//   const categories = await get("/categories/product/tree").then(
//     (res) => res?.payload
//   );

//   const products = await list(
//     `/products/category/list/${categories[0]?.slug}`
//   ).then((res) => res?.payload?.items);
//   const trimmedProducts = products?.slice(0, 10);
//   return trimmedProducts?.map((product) => ({
//     path: product?.slug?.split("/"),
//   }));
// }

export const revalidate = 30;
