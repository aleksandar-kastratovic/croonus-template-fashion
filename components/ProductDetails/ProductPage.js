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
const upsellProductsList = async (id) => {
  const upsellProducts = await list(`/product-details/up-sell/${id}`).then(
    (response) => response?.payload?.items
  );
  return upsellProducts;
};
const relatedProductsList = async (id) => {
  const relatedProducts = await list(`/product-details/recommended/${id}`).then(
    (response) => response?.payload?.items
  );
  return relatedProducts;
};

const crosssellProductsList = async (id) => {
  const crosssellProducts = await list(`/product-details/cross-sell/${id}`).then(
    (response) => response?.payload?.items
  );
  return crosssellProducts;
};

const ProductPage = async ({ path }) => {
  const product = await getProduct(path);
  const productGallery = await getProductGallery(path);
  const desc = await getProductLongDescription(path);

  const relatedProducts = await relatedProductsList(path);
  const upsellProducts = await upsellProductsList(path);
  const crosssellProducts = await crosssellProductsList(path);
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
          relatedProducts={relatedProducts}
          upsellProducts={upsellProducts}
          crosssellProducts={crosssellProducts}
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

     
    </div>
  );
};

export default ProductPage;
