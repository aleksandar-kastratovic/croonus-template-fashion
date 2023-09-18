import { get, post } from "@/app/api/api";
import CategoryPage from "@/components/sections/categories/CategoryPage";
import { Suspense } from "react";

const fetchSingleCategory = async (slug) => {
    return await get(`/categories/product/single/${slug}`).then(
        (res) => res?.payload
    );
};

export async function generateMetadata({ params: { path } }, { searchParams }) {
    const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
    return {
        title: `${singleCategory?.basic_data?.name} - Pazari.rs - Farmerke, Muške farmerke, Muška odeća`,
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

const Category = ({ params: { path } }) => {
    return (
        <CategoryPage path={path} />
    );
};

export default Category;


