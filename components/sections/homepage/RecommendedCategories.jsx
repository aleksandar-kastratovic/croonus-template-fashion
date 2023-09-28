import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const RecommendedCategories = async ({ categories }) => {
    return (
        <div className='grid grid-rows-2 lg:grid-cols-2 px-5 lg:px-20 mt-28 gap-5'>
            {
                categories?.slice(0, 2)?.map((category) => (
                    <Link className='w-full h-[250px] lg:h-[500px] relative' key={category.id} href={`/categories/${category?.url}`}>
                        <Image src={category?.image} fill alt='banner' className='object-cover' />
                    </Link>
                ))
            }
        </div>
    )
}

export default RecommendedCategories