
import { Suspense } from "react";

import { get } from "@/app/api/api";
import Category from "@/components/sections/categories/Category";
import Loading from "@/components/sections/categories/Loader";


const fetchSingleCategory = async (slug) => {
  return await get(`/categories/product/single/${slug}`).then(
    (res) => res?.payload
  );
};

const getBreadcrumbs = async (slug) => {}

export async function generateMetadata({ params: { path } }, { searchParams }) {
  const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
  return {
    title: `${singleCategory?.basic_data?.name} - Pazari.rs - Farmerke, Muške farmerke, Muška odeća`,
    description: "Dobrodošli na Pazari.rs Online Shop",
    keywords: [
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


export default CategoryPage;


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