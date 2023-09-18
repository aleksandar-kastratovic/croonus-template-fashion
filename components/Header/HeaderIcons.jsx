"use client"
import { useCartContext } from '@/app/api/cartContext';
import React from 'react'
import { useState, useEffect, useCallback } from "react";
import Link from 'next/link'
import Image from "next/image";
import { get } from "@/app/api/api";

const HeaderIcons = () => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, , wishList] = useCartContext();
    const [wishListCount, setWishListCount] = useState(0);

    const getCartCount = useCallback(() => {
        get("/cart/badge-count")
            .then((response) => {
                setCartCount(response?.payload?.summary?.items_count ?? 0);
            })
            .catch((error) => console.warn(error));
    }, []);

    const getWishlistCount = useCallback(() => {
        get("/wishlist/badge-count")
            .then((response) => {
                setWishListCount(response?.payload?.summary?.items_count ?? 0);
            })
            .catch((error) => console.warn(error));
    }, []);

    useEffect(() => {
        getWishlistCount();
    }, [getWishlistCount, wishList, wishListCount]);

    useEffect(() => {
        getCartCount();
    }, [getCartCount, cart, cartCount]);

    return (
        <div className='flex items-center'>
            <Link href="/nalog">
                <Image
                    src='/user.png' width={21} height={21} className='object-cover' alt='user'
                />
            </Link>
            <Link href="/lista-zelja">
                <div className="relative">
                    <Image
                        src='/heart.png'
                        width={21} height={21} className='object-cover mx-5' alt='heart'
                    />
                    <span className="absolute -top-2.5 text-white right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                        {wishListCount}
                    </span>
                </div>
            </Link>
            <Link href="/korpa">
                <div className="relative">
                    <Image
                        src='/shopping-bag.png'
                        width={21}
                        height={21}
                        className='object-cover'
                        alt='shopping-bag'
                    />
                    <span className="absolute -top-2 text-white -right-3 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                        {cartCount}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default HeaderIcons