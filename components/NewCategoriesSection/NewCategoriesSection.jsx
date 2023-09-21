import { list } from '@/app/api/api';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link'

const getNew = async () => {
    return await list("/products/new-in/list").then((res) => res?.payload?.items);
};

const NewCategoriesSections = async () => {
    const newCategories = await getNew();

    return (
        <div className='mt-10 lg:mt-28 lg:px-20 px-5'>
            <h2 className='font-bold text-2xl mb-7 text-[#171717]'>Izdvojeno iz nove kolekcije</h2>
            <div className='grid lg:grid-cols-[1fr,2fr,1fr] gap-3'>
                {newCategories?.slice(0, 6)?.map((category, index) => (
                    <Link key={category.id} className={`${index === 1 ? 'row-span-2' : ''} aspect-square relative w-full`} href={`kategorije/${category?.slug_path}`}>
                        <Image src={category.image[1] ?? category.image[0]} alt='category' fill />
                        <div className='absolute bottom-0 left-0 w-full h-14 bg-black/40 z-10 flex items-center justify-center'>
                            <h3 className='text-white text-center text-[33px] font-light  uppercase'>{category?.categories[0]?.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default NewCategoriesSections