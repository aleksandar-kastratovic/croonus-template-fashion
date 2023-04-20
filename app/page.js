import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
const getBanners = async () => {
  const getBanners = await get("/banners/index_slider").then(
    (res) => res?.payload
  );
  return getBanners;
};
const getRecommendedCategories = async () => {
  const getRecommendedCategories = await list(
    "/categories/section/recommended"
  ).then((res) => res?.payload);
  return getRecommendedCategories;
};
const getNew = async () => {
  const getNew = await list("/products/new-in/list").then(
    (res) => res?.payload?.items
  );
  return getNew;
};
const Home = async () => {
  const banners = await getBanners();
  const categories = await getRecommendedCategories();
  const newProducts = await getNew();
  return (
    <div className="4xl:container mx-auto block relative">
      <div className="relative h-[1057px] block" id="slider">
        <IndexSlider banners={banners} />
      </div>
      <RecommendedCategories categories={categories} />
      <RecommendedProducts products={newProducts} />
    </div>
  );
};

export default Home;
