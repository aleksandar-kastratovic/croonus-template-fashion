import { get, list } from "@/app/api/api";
import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";

const getProduct = async (slug) => {
  const getProduct = await get(`/product-details/basic-data/${slug}`).then(
    (res) => res?.payload
  );
  return getProduct;
};

const getProductGallery = async (slug) => {
  const getProductGallery = await get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery
  );
  return getProductGallery;
};

const getProductLongDescription = async (slug) => {
  const getProductLongDescription = await get(
    `/product-details/description/${slug}`
  ).then((res) => res?.payload);
  return getProductLongDescription;
};

const getNewProducts = async () => {
  const getNewProducts = await list("/products/new-in/list").then(
    (res) => res?.payload?.items
  );
  return getNewProducts;
};

export async function generateMetadata({ params: { path } }) {
  const product = await getProduct(path[path?.length - 1]);
  return {
    title: product?.data?.item?.basic_data?.name,
    description:
      product?.data?.item?.basic_data?.short_description ??
      "Pazari online Shop",
  };
}

const ProductDetailPage = async ({ params: { path } }) => {
  const product = await getProduct(path[path?.length - 1]);
  const productGallery = await getProductGallery(path[path?.length - 1]);
  const desc = await getProductLongDescription(path[path?.length - 1]);
  const newProducts = await getNewProducts();
  return (
    <div className="4xl:container mx-auto">
      <ProductDetails
        product={product}
        productGallery={productGallery}
        desc={desc}
      />
      <RecommendedProducts products={newProducts} />
    </div>
  );
};

export default ProductDetailPage;
