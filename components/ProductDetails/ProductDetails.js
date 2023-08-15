"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { get } from "@/app/api/api";
import { useParams, usePathname } from "next/navigation";

const ProductDetails = ({ product, productGallery, desc, path }) => {
  const [rawGallery, setRawGallery] = useState(productGallery);
  const [loading, setLoading] = useState(false);
  const filteredImages = productGallery?.filter((image) => {
    return !image?.variant_key;
  });
  const [gallery, setGallery] = useState(filteredImages);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (color !== null) {
      setLoading(true);
      setGallery(filteredImages);
      const newImage = rawGallery?.find((item) => {
        return item?.variant_key?.includes(color);
      });
      setGallery((prev) => [newImage, ...prev]);
    }
  }, [color]);

  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductGallery
        productGallery={gallery}
        color={color}
        loading={loading}
        setLoading={setLoading}
      />
      <ProductInfo
        product={product}
        desc={desc}
        path={path}
        setColor={setColor}
      />
    </div>
  );
};

export default ProductDetails;
