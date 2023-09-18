import Link from 'next/link'
import React from 'react'
import SliderHeader from './SliderHeader'

function HeaderTop() {
	return (
		<div className='bg-topHeader h-8 w-full flex items-center justify-between px-20'>
			<div>
				<Link href='/' className='text-sm font-normal text-black'>Facebook</Link>
				<span className='mx-2'>-</span>
				<Link href='/' className='text-sm font-normal text-black'>Instagram</Link>
				<span className='mx-2'>-</span>
				<Link href='/' className='text-sm font-normal text-black'>Youtube</Link>
			</div>
			<SliderHeader />
			<div>
				<span className='text-sm font-normal text-black' >Call Centar: </span>
				<Link href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className='text-sm font-normal text-black'>
					{process.env.NEXT_PUBLIC_PHONE_NUMBER}
				</Link>
			</div>
		</div>
	)
}

export default HeaderTop