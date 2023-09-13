'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

const HeaderContainerLinks = ({ categoriesMain }) => {
    const pathname = usePathname();

    return (
        <div>
            {categoriesMain?.map((category, index) => (
                <Link href={`/category/${category?.slug}`} key={index} className={`${pathname === category?.slug ? 'border-b-2 border-black' : ''} mx-2 text-sm font-normal text-black uppercase 2xl:mr-8`}>
                    {category?.name}
                </Link>
            ))}
        </div>
    )
}

export default HeaderContainerLinks