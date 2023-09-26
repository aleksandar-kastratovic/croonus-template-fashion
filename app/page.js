import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/RecommendedCategories/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";

const getBanners = async () => {
  return await get("/banners/index_slider").then((res) => res?.payload);
};
const getRecommendedCategories = async () => {
  return await list("/categories/section/recommended").then(
    (res) => res?.payload
  );
};
const getRecommendedProducts = async () => {
  return await list("/products/section/list/recommendation").then((res) => res?.payload?.items);
};
const getIndexBanner = async () => {
  return await get("/banners/index_banner").then((res) => res?.payload);
};

const fetchAction4 = async () => {
  const fetchAction4 = await get("/banners/akcija4").then(
    (response) => response?.payload
  );
  return fetchAction4;
};

const getInstagramPost = async () => {
  const resData = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`
  );

 const data = await resData.json();
 
 return data;
};

export const revalidate = 30;

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
  const recommendedProducts = await getRecommendedProducts();
  const instagramImages = await getInstagramPost();
  const action4 = await fetchAction4();
  
  return (
    <>
      <div className="block relative overflow-hidden">
        <div
          className="relative max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] block"
          id="slider"
        >
          <IndexSlider banners={banners} />
        </div>
        <div className="overflow-hidden">
            <RecommendedProducts recommendedProducts={recommendedProducts}  action4={action4} />
        </div>
        <RecommendedCategories categories={categories} />
          <NewCategoriesSections />
          <NewsLetterInstagramSection instagramImages={instagramImages}/>
      </div>
    </>
  );
};

export default Home;


