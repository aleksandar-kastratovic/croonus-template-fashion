"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProductDetails = ({
  product,
  productGallery,
  desc,
  path,
  breadcrumbs,
}) => {
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
    <div className="max-md:mt-[1rem]  max-md:w-[95%]  max-md:mx-auto md:mx-[3rem] mt-6">
      <div className="flex items-center gap-2 flex-wrap max-lg:hidden">
        <Link href={`/`} className="text-[#191919] text-[0.95rem] font-normal">
          Početna
        </Link>{" "}
        <i className="fas fa-chevron-right text-[#000]  text-[0.6rem]"></i>
        {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
          return (
            <div className="flex items-center gap-2">
              <Link
                href={
                  index === arr.length - 1
                    ? `/kategorije/${breadcrumb?.slug}`
                    : `/kategorije/${breadcrumb?.slug}`
                }
                className="text-[#000] text-[0.95rem] font-normal "
              >
                {breadcrumb?.name}
              </Link>
              {index !== arr.length - 1 && (
                <i className="fas fa-chevron-right text-[#000]  text-[0.6rem]"></i>
              )}
            </div>
          );
        })}
        <i className="fas fa-chevron-right text-[#000]  text-[0.6rem]"></i>
        <h1 className="text-[#000] text-[0.95rem] font-normal">
          {breadcrumbs?.end?.name}
        </h1>
      </div>
      <div className=" grid grid-cols-4  gap-x-[4.063rem] mt-10">
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
          breadcrumbs={breadcrumbs}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
