import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";
import ProductGallery from "../ProductMobileDetails/ProductMobileGallery";
import ProductMobileDetails from "../ProductMobileDetails/ProductMobileDetails";

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

const getNewProducts = async (slug) => {
  return await list(`/product-details/cross-sell/${slug}`).then(
    (res) => res?.payload?.items
  );
};

const getBreadcrumbs = async (slug) => {
  return await get(`/product-details/breadcrumbs/${slug}`).then(
    (res) => res?.payload
  );
};

const getSpecification = async (slug) => {
  return await get(`/product-details/specification/${slug}`).then(
    (res) => res?.payload
  );
};

const getDeclaration = async (slug) => {
  return await get(`/product-details/declaration/${slug}`).then(
    (res) => res?.payload
  );
};

const ProductPage = async ({ path }) => {
  const product = await getProduct(path);
  const productGallery = await getProductGallery(path);
  const desc = await getProductLongDescription(path);
  const crossSell = await getNewProducts(path);
  const breadcrumbs = await getBreadcrumbs(path);
  const specification = await getSpecification(path);
  const declaration = await getDeclaration(path);
  return (
    <div className="">
      <div className="hidden lg:block">
        <ProductDetails
          product={product}
          productGallery={productGallery}
          desc={desc}
          path={path}
          breadcrumbs={breadcrumbs}
          specification={specification}
          declaration={declaration}
        />
      </div>
      <div className="max-lg:block hidden">
        <ProductMobileDetails
          product={product}
          productGallery={productGallery}
          desc={desc}
          path={path}
          breadcrumbs={breadcrumbs}
          specification={specification}
          declaration={declaration}
        />
      </div>

      {crossSell?.length > 0 && <RecommendedProducts products={crossSell} />}
    </div>
  );
};

export default ProductPage;
