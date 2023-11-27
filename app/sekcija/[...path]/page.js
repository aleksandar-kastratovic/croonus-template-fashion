import { get, list, post } from "@/app/api/api";
import CategoryPage from "@/components/sections/categories/CategoryPage";

const fetchFilters = async (slug) => {
  const fetchFilters = await post(`/products/section/filters/${slug}`).then(
    (res) => res?.payload
  );
  return fetchFilters;
};

const fetchProductsFromSection = async (slug) => {
  const fetchProductsFromSection = await list(
    `/products/section/list/${slug}`
  ).then((res) => res?.payload);
  return fetchProductsFromSection;
};

const Section = async ({ params: { path } }) => {
  let slug;
  switch (true) {
    case path[path?.length - 1] === "preporuceno":
      slug = "recommendation";
      break;
    default:
      break;
  }

  const filters = await fetchFilters(slug);
  const productsFromSection = await fetchProductsFromSection(slug);

  return (
    <>
      <CategoryPage
        text={"Preporučeno"}
        slug={slug}
        filter={filters}
        sectionSlug={path[path?.length - 1]}
      />
    </>
  );
};

export default Section;
