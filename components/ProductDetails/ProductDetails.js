"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { get } from "@/app/api/api";

const ProductDetails = ({ product, productGallery, desc, path }) => {
  const [isNewURL, setIsNewURL] = useState(false);
  const [gallery, setGallery] = useState(productGallery);

  useEffect(() => {
    if (isNewURL) {
      const getNewGallery = async () => {
        return await get(`/product-details/gallery/${path}`)
          .then((res) => {
            setGallery(res?.payload?.gallery);
          })
          .finally(() => {
            setIsNewURL(false);
          });
      };
      getNewGallery();
    }
  }, [isNewURL]);

  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductGallery productGallery={gallery} />
      <ProductInfo
        product={product}
        desc={desc}
        path={path}
        isNewURL={isNewURL}
        setIsNewURL={setIsNewURL}
      />
    </div>
  );
};

export default ProductDetails;
