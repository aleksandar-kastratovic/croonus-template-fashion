import { get } from "@/api/api";
import { Suspense } from "react";
import { ProductPage } from "@/components/ProductDetails/ProductPage";
import Loader from "@/components/Loader";

const ProductDetailPage = ({ params: { path } }) => {
  return (
    <ProductPage
      path={path[path?.length - 1]}
      categoryId={path[path?.length - 2]}
    />
  );
};

export default ProductDetailPage;

export const revalidate = 30;
