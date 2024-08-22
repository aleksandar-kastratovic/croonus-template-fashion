import { list, post, get } from "@/api/api";
import CategoryPage from "./CategoryPage";
import { notFound } from "next/navigation";

const Category = async ({ path }) => {
  return <CategoryPage slug={path} />;
};

export default Category;
