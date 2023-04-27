import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

const ProductDetails = ({ product, productGallery }) => {
  return (
    <div className="mt-[9rem] mx-[5rem] grid grid-cols-4">
      <ProductInfo product={product} />
      <ProductGallery productGallery={productGallery} />
    </div>
  );
};

export default ProductDetails;
