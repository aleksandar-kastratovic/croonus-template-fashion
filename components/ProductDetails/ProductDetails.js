import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

const ProductDetails = ({ product, productGallery }) => {
  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] grid grid-cols-4">
      <ProductInfo product={product} />
      <ProductGallery productGallery={productGallery} />
    </div>
  );
};

export default ProductDetails;
