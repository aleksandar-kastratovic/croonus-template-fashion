import Link from 'next/link'
import React from 'react'
import HeaderTop from './HeaderTop'
import Image from 'next/image'
import { get } from '@/app/api/api';
import HeaderContainerLinks from './HeaderContainerLinks';

const getCategories = async () => {
	return await get("/categories/product/tree").then((response) => response?.payload);
};

const Header = async () => {
	const categories = await getCategories();

	const categoriesMain = [{ name: 'Početna', slug: '/' }, ...categories, { name: 'Brendovi', slug: '/brendovi' }, { name: 'Blog', slug: '/blogs' }, { name: 'Maloprodaje', slug: '/maloprodaje' }, { name: 'Kontakt', slug: '/kontakt' }]

	return (
		<div className=''>
			<HeaderTop />
			<div className='py-5 px-20 flex items-center justify-between'>
				<Link href='/'>
					<Image mage src='/logo.png' width={185} height={39} className='object-cover' />
				</Link>

				<HeaderContainerLinks categoriesMain={categoriesMain} />
				<div className='py-4 w-1/5 rounded-[10px] bg-topHeader relative'>
					<form>
						<input
							type="text"
							placeholder="PRETRAGA"
							className='w-full h-full rounded-[10px] px-5 absolute top-0 left-0 bg-transparent text-sm font-normal text-black focus:outline-none'
						//   value={searchTerm}
						/>
						<div className='absolute right-2 top-1/2 -translate-y-1/2 py-2'>
							<Image src={'/search.png'} width={20} height={20} className='object-cover' />
						</div>
					</form>
				</div>
				<div>
					<p className='text-sm font-bold text-black'>EN</p>
				</div>
				<div className='flex items-center'>
					<Image src={'/user.png'} width={21} height={21} className='object-cover' />
					<Image src={'/heart.png'} width={21} height={21} className='object-cover mx-5' />
					<Image src={'/shopping-bag.png'} width={21} height={21} className='object-cover' />
				</div>
			</div>
		</div>
	)
}

export default Header