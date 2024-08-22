import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "@/api/api";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";

const getBanners = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};
const getMobileBanners = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getBannersCategories = () => {
  return get("/banners/index-first-banner").then((res) => res?.payload);
};
const getRecommendedProducts = () => {
  return list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};
const getIndexBanner = () => {
  return get("/banners/index_banner").then((res) => res?.payload);
};
const fetchAction4 = () => {
  return get("/banners/akcija4").then((response) => response?.payload);
};
const getNew = () => {
  return list("/categories/section/recommended").then((res) => res?.payload);
};

const Home = async () => {
  const [
    banners,
    recommendedProducts,
    categories,
    mobileBanners,
    recommendedCategories,
  ] = await Promise.all([
    getBanners(),
    getRecommendedProducts(),
    getBannersCategories(),
    getMobileBanners(),
    getNew(),
  ]);

  return (
    <>
      <div className="block relative overflow-hidden">
        <div
          className="relative max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[700px] 2xl:h-[750px] 3xl:h-[800px] block"
          id="slider"
        >
          <IndexSlider banners={banners} mobileBanners={mobileBanners} />
        </div>
        <div className="overflow-hidden">
          <RecommendedProducts
            recommendedProducts={recommendedProducts}
            action4={`Izdvajamo za Vas`}
          />
        </div>
        <RecommendedCategories categories={categories} />
        <NewCategoriesSections categories={recommendedCategories} />
        <NewsLetterInstagramSection />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;
