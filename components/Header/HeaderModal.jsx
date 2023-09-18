"use client"
import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useCartContext } from '@/app/api/cartContext'
import Image from 'next/image'

const HeaderModal = () => {
    const [, , , , , , openHeader, mutateOpenHeader, chooseCategory] = useCartContext()
    const [chooseChildCategory, setChooseChildCategory] = useState(null)

    useEffect(() => {
        setChooseChildCategory(null)
    }, [chooseCategory])



    return (
        <Dialog open={openHeader} onClose={() => mutateOpenHeader(false)} className='absolute top-[110px] right-0 w-full bg-white z-50 h-[257px] max-lg:hidden' as="div">
            <div className='w-full h-1 bg-topHeader' />
            <Dialog.Panel className='px-20 py-6 relative h-full'>
                <div className='flex justify-between h-full'>
                    <div className='flex gap-x-[10rem]'>
                        <div>
                            {chooseCategory?.children?.map((category, index) => (
                                <button key={index} className={`${category?.id === chooseChildCategory?.id ? 'font-bold' : 'font-normal'} text-lg uppercase  block text-black`} onClick={() => setChooseChildCategory(category)}>{category.name}</button>
                            ))}
                        </div>
                        <div className='h-[85%]'>
                            <h3 className='text-[15px] uppercase text-black font-bold mb-4'>{chooseChildCategory?.name}</h3>
                            <div className='h-full flex flex-col flex-wrap gap-x-6'>
                                {chooseChildCategory && chooseChildCategory?.children?.map(
                                    childCategory => (
                                        <Link href={`/kategorije/${childCategory?.slug_path}`} onClick={() => mutateOpenHeader(false)} key={childCategory?.id} className='text-[15px] lowercase text-black first-letter:uppercase block'>
                                            {childCategory.name}
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>


                    </div>
                    <div className='relative aspect-video'>
                        <Image src='/fashion-img.png' alt='img-modal' fill priority className='object-cover' />
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default HeaderModal