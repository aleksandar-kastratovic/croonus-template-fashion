import { get, list, post } from "@/app/api/api";
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import NavigationDesktop from "@/components/Navigation/NavigationDesktop";

const fetchFilters = async (slug) => {
  const fetchFilters = await post(`/products/category/filters/${slug}`).then(
    (res) => res?.payload
  );
  return fetchFilters;
};

const fetchSingleCategory = async (slug) => {
  const fetchSingleCategory = await get(
    `/categories/product/single/${slug}`
  ).then((res) => res?.payload);
  return fetchSingleCategory;
};

const Category = async ({ params: { path } }) => {
  const filters = await fetchFilters(path[path?.length - 1]);
  const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
  return (
    <>
      <NavigationDesktop category={true} />
      <CategoryPage filter={filters} singleCategory={singleCategory} />
    </>
  );
};

export default Category;
