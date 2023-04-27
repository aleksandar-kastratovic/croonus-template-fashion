import { get } from "@/app/api/api";
import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

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

const ProductDetailPage = async ({ params: { path } }) => {
  const product = await getProduct(path[path?.length - 1]);
  const productGallery = await getProductGallery(path[path?.length - 1]);

  return (
    <div className="4xl:container mx-auto">
      <NavigationDesktop category={true} />
      <ProductDetails product={product} productGallery={productGallery} />
    </div>
  );
};

export default ProductDetailPage;
