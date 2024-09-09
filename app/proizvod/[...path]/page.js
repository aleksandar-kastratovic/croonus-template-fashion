import { get } from "@/api/api";
import { Suspense } from "react";
import { ProductPage } from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";
import { headers } from "next/headers";

const ProductDetailPage = ({ params: { path } }) => {
  let headers_list = headers();
  let canonical = headers_list.get("x-pathname");
  let base_url = headers_list.get("x-base_url");

  return (
    <ProductPage
      path={path[path?.length - 1]}
      categoryId={path[path?.length - 2]}
      canonical={canonical}
      base_url={base_url}
    />
  );
};

export default ProductDetailPage;

export const revalidate = 30;
