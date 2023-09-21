
import Link from 'next/link'
import React from 'react'
import HeaderTop from './HeaderTop'
import Image from 'next/image'
import HeaderContainerLinks from './HeaderContainerLinks';
import { get } from '@/app/api/api';
import HeaderIcons from './HeaderIcons';
import SearchProducts from './SearchProducts';
import Translate from '../Translate/Translate';

const getCategories = async () => {
	return await get("/categories/product/tree").then((response) => response?.payload);
};

const Header = async () => {
	const categories = await getCategories();
	const categoriesMain = [{ name: 'Početna', slug: '/' }, ...categories, { name: 'Brendovi', slug: '/brendovi' }, { name: 'Blog', slug: '/blogs' }, { name: 'Maloprodaje', slug: '/maloprodaje' }, { name: 'Kontakt', slug: '/kontakt' }]

	return (
		<header className='max-xl:hidden top-0 sticky w-full z-[1000000] bg-white border-b-4 border-topHeader'>
			<HeaderTop />
			<div className='py-5 px-20 flex items-center justify-between'>
				<Link href='/'>
					<Image src='/logo.png' width={185} height={39} className='object-cover' alt='logo' />
				</Link>
				<HeaderContainerLinks categoriesMain={categoriesMain} />
				<SearchProducts />
				<div>
					<Translate />
				</div>
				<HeaderIcons />
			</div>
		</header>
	)
}

export default Header