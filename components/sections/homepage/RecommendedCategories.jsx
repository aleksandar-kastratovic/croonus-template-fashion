import { list } from '@/app/api/api';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const getRecommendedCategories = async () => {
    return await list("/categories/section/recommended").then(
        (res) => res?.payload
    );
};

const RecommendedCategories = async () => {
    const categoriesRecommended = await getRecommendedCategories();


    return (
        <div className='grid grid-cols-2 px-20 mt-28 gap-5'>
            {
                categoriesRecommended?.slice(0, 2)?.map((category) => (
                    <Link className='w-full h-[500px] relative' key={category.id} href={`/categories/${category?.slug}`}>
                        <Image src={category?.images?.image} fill alt='banner' className='object-cover' />
                    </Link>
                ))
            }
        </div>
    )
}

export default RecommendedCategories