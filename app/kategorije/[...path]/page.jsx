import { Suspense } from "react";

import { get } from "@/app/api/api";

import Loading from "@/components/sections/categories/Loader";
import Category from "@/components/sections/categories/Category";

const fetchSingleCategory = async (slug) => {
  return await get(`/categories/product/single/${slug}`).then(
    (res) => res?.payload
  );
};

export async function generateMetadata({ params: { path } }, { searchParams }) {
  const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
  return {
    title: `${singleCategory?.basic_data?.name} - croonus.com - Farmerke, Muške farmerke, Muška odeća`,
    description: "Dobrodošli na croonus.com Online Shop",
    keywords: [
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
    ],
  };
}

const CategoryPage = ({ params: { path } }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Category path={path[path?.length - 1]} />
      </Suspense>
    </>
  );
};

export async function generateStaticParams() {
  const categories = await get("/categories/product/tree").then(
    (res) => res?.payload
  );
  let paths = [];
  const recursiveChildren = (categories, paths) => {
    categories?.forEach((category) => {
      paths?.push(category?.slug_path.toString());
      recursiveChildren(category?.children, paths);
    });
  };
  recursiveChildren(categories, paths);
  return paths?.map((category) => ({
    path: category?.split("/"),
  }));
}

export const revalidate = 30;

export default CategoryPage;
