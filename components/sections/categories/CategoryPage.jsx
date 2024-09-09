import { Suspense } from "react";
import { SingleCategory } from "@/components/CategoryPage/single-category";
import { CategoryProducts } from "@/components/CategoryPage/category-products";
import { ToastContainer } from "react-toastify";

export const CategoryData = ({
  slug,
  className,
  sortDirection,
  sortField,
  filters,
  strana,
  allFilters,
  viewed,
  isSection = false,
  base_url,
  path,
}) => {
  const renderText = (slug) => {
    switch (slug) {
      case "recommendation":
        return (
          <div className="mt-[30px] md:mt-[80px] flex flex-col items-center justify-center">
            <h1 className="text-[23px] md:text-[29px] font-normal uppercase">
              Preporučujemo
            </h1>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <>
            <div className={`h-10 mt-5 w-full bg-slate-300 animate-pulse`} />
            <div className={`h-20 mt-10 w-full bg-slate-300 animate-pulse`} />
          </>
        }
      >
        {isSection ? (
          renderText(slug)
        ) : (
          <SingleCategory slug={slug} base_url={base_url} path={path} />
        )}
      </Suspense>

      <CategoryProducts
        slug={slug}
        viewed={viewed}
        sortDirection={sortDirection}
        sortField={sortField}
        filters={filters}
        strana={strana}
        isSection={isSection}
        allFilters={allFilters}
      />
    </>
  );
};
