"use client";

import { list } from "@/app/api/api";
import { useEffect, useState } from "react";
import { useCartContext } from "@/app/api/cartContext";
import WishlistItems from "../WishlistItems/WishlistItems";
import Link from "next/link";

const WishlistPage = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [, , wishlist] = useCartContext();

  useEffect(() => {
    const getWishlist = async () => {
      const getWishlist = await list("/wishlist").then((response) =>
        setWishlistData(response?.payload?.items)
      );
    };
    getWishlist();
  }, [wishlist]);

  return (
    <>
      {wishlistData?.length > 0 ? (
        <div className="mt-5 mx-[0.625rem] grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {wishlistData?.map((item) => (
            <div key={item?.wishlist?.id}>
              <WishlistItems
                items={item?.wishlist?.id}
                product={item?.product}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[1.2rem] max-sm:w-[95%] mx-autoa lg:mt-[15rem] flex flex-col items-center justify-center py-5 text-center">
          <div className="rounded-lg border p-10">
            <h1 className="text-lg font-medium">Vaša lista želja je prazna!</h1>{" "}
            <p>Kada dodate artikle u listu želja, oni će se pojaviti ovde.</p>
            <Link href="/">
              <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                Vrati se na početnu stranu
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistPage;
