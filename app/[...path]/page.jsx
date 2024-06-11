import { get } from "@/app/api/api";
import CategoryPage from "@/app/kategorije/[...path]/page";
import ProductPage from "@/app/proizvod/[...path]/page";
import { Suspense } from "react";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { notFound, redirect } from "next/navigation";

const handleData = async (slug) => {
  return await get(`/slugs/product-categories?slug=${slug}`).then(
    (res) => res?.payload
  );
};

const fetchCategorySEO = async (slug) => {
  return await get(`/categories/product/single/seo/${slug}`).then(
    (response) => response?.payload
  );
};

const getProductSEO = async (id) => {
  return await get(`/product-details/seo/${id}`).then(
    (response) => response?.payload
  );
};

const defaultMetadata = {
  title: "Početna | Fashion Template",
  description: "Dobrodošli na Fashion Template Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Početna | Fashion Template",
    description: "Dobrodošli na Fashion Template Online Shop",
    type: "website",
    url: "https://croonus.com",
    image: "https://croonus.com/images/logo.png",
    site_name: "croonus.com",
    locale: "sr_RS",
  },
};

export async function generateMetadata({ params: { path } }) {
  const str = path?.join("/");
  const data = await handleData(str);

  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(path[path?.length - 1]);
      const image_category =
        convertHttpToHttps(category?.image) ??
        "https://croonus.com/images/logo.png";

      if (category) {
        return {
          title: `${category?.title} | Fashion Template` ?? "",
          description: category?.description ?? "",
          keywords: category?.keywords ?? "",
          type: category?.type ?? "",
          image: image_category ?? "",
          openGraph: {
            title: `${category?.title} | Fashion Template` ?? "",
            description: category?.description ?? "",
            type: category?.type ?? "",
            images: [
              {
                url: image_category ?? "",
                width: 800,
                height: 600,
                alt: category?.description ?? "",
                title: category?.title ?? "",
                description: category?.description ?? "",
              },
            ],
          },
        };
      } else {
        return defaultMetadata;
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(path[path?.length - 1]);
      const image =
        convertHttpToHttps(productSEO?.meta_image) ??
        "https://croonus.com/images/logo.png";
      if (productSEO) {
        return {
          title: `${productSEO?.meta_title} | Fashion Template` ?? "",
          description: productSEO?.meta_description ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title: productSEO?.meta_title ?? "",
            description: productSEO?.meta_description ?? "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt: productSEO?.meta_title ?? productSEO?.meta_description,
              },
            ],
          },
        };
      } else {
        return defaultMetadata;
      }
  }
}

const CategoryProduct = async ({ params: { path }, params, searchParams }) => {
  const str = path?.join("/");
  const data = await handleData(str);

  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      return <CategoryPage params={params} searchParams={searchParams} />;
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      return <ProductPage params={params} />;
    case data?.status === false:
      return notFound();
    default:
      redirect(`/${data?.redirect_url}`);
  }
};

export default CategoryProduct;
