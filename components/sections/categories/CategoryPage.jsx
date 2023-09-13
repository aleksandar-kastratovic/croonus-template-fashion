import React from 'react'
import CategoryLogicPage from './CategoryLogicPage'
import { get, post } from '@/app/api/api';

// const fetchFilters = async (slug) => {
//     return await post(`/products/category/filters/${slug}`).then(
//         (res) => res?.payload
//     );
// };

const fetchSingleCategory = async (slug) => {
    return await get(`/categories/product/single/${slug}`).then(
        (res) => res?.payload
    );
};

const CategoryPage = async ({ path }) => {
    const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
    // const filter = await fetchFilters(path[path?.length - 1]);

    return (
        <CategoryLogicPage singleCategory={singleCategory} />
    )
}

export default CategoryPage


export async function generateStaticParams() {
    const categories = await get("/categories/product/tree").then(
        (res) => res?.payload
    );
    let paths = [];
    const recursiveChildren = (categories, paths) => {
        categories?.forEach((category) => {
            paths?.push(category?.slug_path.toString());
            recursiveChildren(category?.children, paths);
        });
    };
    recursiveChildren(categories, paths);
    return paths?.map((category) => ({
        path: category?.split("/"),
    }));
}

export const revalidate = 30;
