import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";

const getProduct = async (slug) => {
  return await get(`/product-details/basic-data/${slug}`).then(
    (res) => res?.payload
  );
};

const getProductGallery = async (slug) => {
  return await get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery
  );
};

const getProductLongDescription = async (slug) => {
  return await get(`/product-details/description/${slug}`).then(
    (res) => res?.payload
  );
};

const getNewProducts = async () => {
  return await list("/products/new-in/list").then((res) => res?.payload?.items);
};

const ProductPage = async ({ path }) => {
  const product = await getProduct(path);
  const productGallery = await getProductGallery(path);
  const desc = await getProductLongDescription(path);
  const newProducts = await getNewProducts();

  return (
    <div className="">
      <ProductDetails
        product={product}
        productGallery={productGallery}
        desc={desc}
        path={path}
      />
      <RecommendedProducts products={newProducts} />
    </div>
  );
};

export default ProductPage;
