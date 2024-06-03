import { Suspense } from "react";

import { get } from "@/app/api/api";

import Loading from "@/components/sections/categories/Loader";
import Category from "@/components/sections/categories/Category";
import { CategoryData } from "@/components/sections/categories/CategoryPage";
import {convertHttpToHttps} from "@/helpers/convertHttpToHttps";

export async function generateMetadata({ params: { path } }) {
  const fetchCategorySEO = (slug) => {
    return get(`/categories/product/single/seo/${slug}`).then(
        (res) => res?.payload
    );
  };
  const category_seo = await fetchCategorySEO(path[path?.length - 1]);
  return {
    title: `${category_seo?.title}`,
    description:
      category_seo?.description ?? "Dobrodošli na Croonus.rs Online Shop",
    keywords: [
      "Croonus",
      "online",
      "shop",
      "Croonus.rs",
      "farmerke",
      "trenerke",
      "dukserice",
      "Croonus obuca",
      "obuca",
      "Croonus online",
    ],
    openGraph: {
      title: `${category_seo?.title}`,
      description: "Dobrodošli na Croonus.rs Online Shop",
      keywords: [
        "Croonus",
        "online",
        "shop",
        "Croonus.rs",
        "farmerke",
        "trenerke",
        "dukserice",
        "Croonus obuca",
        "obuca",
        "Croonus online",
        category_seo?.keywords,
      ],
      images: [
        {
          url: convertHttpToHttps(category_seo?.image) ?? "",
          width: 800,
          height: 600,
          alt: category_seo?.description ?? "Croonus.rs",
        },
      ],
    },
  };
}


const CategoryPage = ({
  params: { path },
  searchParams: { sort: sortURL, strana, filteri },
}) => {
  //slug kategorije
  const slug = path[path?.length - 1];

  //vadimo sort iz URL
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];

  //vadimo stranu iz URL i konvertujemo u type Number
  const page = Number(strana) > 0 ? Number(strana) : 1;

  //uzimamo sve filtere sa api-ja
  // const allFilters = await getAllFilters(slug);

  //vadimo filtere iz URL
  const filters = filteri?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  return (
    <CategoryData
      slug={slug}
      sortField={sortField}
      sortDirection={sortDirection}
      strana={page}
      allFilters={[]}
      filters={filters}
    />
  );
};

export default CategoryPage;
