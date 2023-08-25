import { Suspense } from "react";
import NewProductsPage from "@/components/NewProductsPage/NewProductsPage";

const Novo = () => {
  return (
    <Suspense
      fallback={
        <div className="grid max-md:grid-cols-2 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                />
              );
            })}
          </>
        </div>
      }
    >
      <NewProductsPage />
    </Suspense>
  );
};

export default Novo;

export const metadata = {
  title: "Novo - Pazari.rs - Farmerke, Muške farmerke, Muška odeća",
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