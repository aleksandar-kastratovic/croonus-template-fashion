import { get, post } from "@/app/api/api";
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import { Suspense } from "react";

const fetchFilters = async (slug) => {
  return await post(`/products/category/filters/${slug}`).then(
    (res) => res?.payload
  );
};

const fetchSingleCategory = async (slug) => {
  return await get(`/categories/product/single/${slug}`).then(
    (res) => res?.payload
  );
};
const getCategories = async () => {
  return await get("/categories/product/tree").then((res) => res?.payload);
};

export async function generateMetadata({ params: { path } }) {
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

const Category = async ({ params: { path } }) => {
  const filters = await fetchFilters(path[path?.length - 1]);
  const singleCategory = await fetchSingleCategory(path[path?.length - 1]);

  return <CategoryPage filter={filters} singleCategory={singleCategory} />;
};

export default Category;
