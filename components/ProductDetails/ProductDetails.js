"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { get } from "@/app/api/api";

const ProductDetails = ({ product, productGallery, desc, path }) => {
  const [isNewURL, setIsNewURL] = useState(false);
  const [gallery, setGallery] = useState(productGallery);
  const [variantKey, setVariantKey] = useState(null);
  const [leadingPicture, setLeadingPicture] = useState(null);
  useEffect(() => {
    if (isNewURL) {
      const getNewGallery = async () => {
        return await get(`/product-details/gallery/${path}`)
          .then((res) => {
            const newImage = res?.payload?.gallery.find((item) => {
              return item?.variant_key === variantKey;
            });
            setLeadingPicture(newImage?.image);
          })
          .finally(() => {
            setIsNewURL(false);
          });
      };
      getNewGallery();
    }
  }, [isNewURL, variantKey]);
  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductGallery
        productGallery={gallery}
        leadingPicture={leadingPicture}
      />
      <ProductInfo
        product={product}
        desc={desc}
        path={path}
        isNewURL={isNewURL}
        setIsNewURL={setIsNewURL}
        variantKey={variantKey}
        setVariantKey={setVariantKey}
      />
    </div>
  );
};

export default ProductDetails;
