import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "@/api/api";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

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

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: "Početna | Fashion Template",
    description: "Dobrodošli na Fashion Template Online Shop",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Početna | Fashion Template",
      description: "Dobrodošli na Fashion Template Online Shop",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Fashion Template",
        },
      ],
      locale: "sr_RS",
    },
  };
};
