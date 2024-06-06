import { Suspense } from "react";

import { get } from "@/app/api/api";

import Loading from "@/components/sections/categories/Loader";
import Category from "@/components/sections/categories/Category";
import { CategoryData } from "@/components/sections/categories/CategoryPage";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";

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
