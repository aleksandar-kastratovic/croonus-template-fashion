import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
import IndexBanner from "@/components/IndexBanner/IndexBanner";
import Newsletter from "@/components/Newsletter/Newsletter";
import { Suspense } from "react";
import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
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
const getIndexBanner = async () => {
  const getIndexBanner = await get("/banners/index_banner").then(
    (res) => res?.payload
  );
  return getIndexBanner;
};

export async function generateMetadata() {
  return {
    title: "Pazari.rs Online Shop",
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

const Home = async () => {
  const banners = await getBanners();
  const categories = await getRecommendedCategories();
  const newProducts = await getNew();
  const indexBanner = await getIndexBanner();
  return (
    <>
      <div className="4xl:container mx-auto block relative overflow-hidden">
        <div
          className="relative max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] block"
          id="slider"
        >
          <IndexSlider banners={banners} />
        </div>
        <RecommendedCategories categories={categories} />
        <div className="overflow-hidden">
          <RecommendedProducts products={newProducts} />
        </div>
        <IndexBanner banner={indexBanner} />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
