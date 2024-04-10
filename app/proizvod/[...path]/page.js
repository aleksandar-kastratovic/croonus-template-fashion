import { get } from "@/app/api/api";
import { Suspense } from "react";
import { ProductPage } from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";

const ProductDetailPage = ({ params: { path } }) => {
  return <ProductPage path={path[path?.length - 1]} />;
};

export default ProductDetailPage;

export const generateMetadata = async ({ params: { path } }) => {
  const getProductSEO = (slug) => {
    return get(`/product-details/seo/${slug}`).then((res) => {
      return res?.payload;
    });
  };
  const product = await getProductSEO(path[path?.length - 1]);
  // const productImage = await getProductGallery(path[path?.length - 1]);
  return {
    title: product?.meta_title,
    description: product?.meta_description ?? "Croonus online Shop",

    openGraph: {
      title: product?.meta_title,
      description: product?.meta_description ?? "Croonus online Shop",
      site_name: "croonus.com",
      images: [
        {
          url: product?.meta_image,
          width: 800,
          height: 600,
          alt: product?.meta_description,
        },
      ],
    },

    twitter: {
      handle: "@Croonusrs",
      site: "@Croonusrs",
      cardType: "summary_large_image",
    },
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
