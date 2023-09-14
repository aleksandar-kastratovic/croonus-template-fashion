'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { useCartContext } from '@/app/api/cartContext'

const HeaderContainerLinks = ({ categoriesMain }) => {
    const [, , , , , , openHeader, mutateOpenHeader, , mutateChooseCategory] = useCartContext();
    const pathname = usePathname();

    return (
        <div>
            {categoriesMain?.map((category, index) => (
                category?.children?.length > 0 ?
                    <button onClick={() => {
                        mutateOpenHeader(true);
                        mutateChooseCategory(category)
                    }}
                        key={index} className={`${pathname === category?.slug ? 'border-b-2 border-black' : ''} mx-2 text-sm font-normal text-black uppercase 2xl:mr-8`}>
                        {category?.name}
                    </button> : <Link href={`/category/${category?.slug}`} key={index} className={`${pathname === category?.slug ? 'border-b-2 border-black' : ''} mx-2 text-sm font-normal text-black uppercase 2xl:mr-8`}>
                        {category?.name}
                    </Link>
            )
            )}
        </div>
    )
}

export default HeaderContainerLinks