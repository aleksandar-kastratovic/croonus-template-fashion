"use client"
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import {useState} from "react";

const ProductDetails = ({ product, productGallery, desc, path }) => {
  const [isNewURL, setIsNewURL] = useState(false);
  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductGallery productGallery={productGallery} />
      <ProductInfo product={product} desc={desc} path={path} isNewURL={isNewURL} setIsNewURL={setIsNewURL}/>
    </div>
  );
};

export default ProductDetails;
