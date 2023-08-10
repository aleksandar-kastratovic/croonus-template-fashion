import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
import IndexBanner from "@/components/IndexBanner/IndexBanner";
import Newsletter from "@/components/Newsletter/Newsletter";

const getBanners = async () => {
  return await get("/banners/index_slider").then((res) => res?.payload);
};
const getRecommendedCategories = async () => {
  return await list("/categories/section/recommended").then(
    (res) => res?.payload
  );
};
const getNew = async () => {
  return await list("/products/new-in/list").then((res) => res?.payload?.items);
};
const getIndexBanner = async () => {
  return await get("/banners/index_banner").then((res) => res?.payload);
};

export const metadata = {
  title: "Početna - Pazari.rs - Farmerke, Muške farmerke, Muška odeća",
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
  robots: "index, follow",
  og: {
    title: "Pazari.rs - Farmerke, Muške farmerke, Muška odeća",
    description: "Dobrodošli na Pazari.rs Online Shop",
    type: "website",
    url: "https://pazari.rs",
    image: "https://pazari.rs/images/logo.png",
    site_name: "Pazari.rs",
    locale: "sr_RS",
  },
};

const Home = async () => {
  const banners = await getBanners();
  const categories = await getRecommendedCategories();
  const newProducts = await getNew();
  const indexBanner = await getIndexBanner();
  return (
    <>
      <div className="block relative overflow-hidden">
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

export const revalidate = 30;
