import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import InstragramSection from './InstagramSection'

const NewsLetterInstagramSection = () => {
    return (
        <div className='grid grid-cols-[1fr,2fr] mt-32 gap-14 2xl:gap-28 px-20'>
            <div className='self-center'>
                <h2 className='font-bold text-[40px] text-black'>Ostvari 10% popusta</h2>
                <p className='text-base font-normal text-black my-8'>Prijavi se na naš bilten i dobićeš 10% popusta na sledeću kupovinu, pristup
                    ekskluzivnim promocijama i još mnogo toga!</p>
                <form className='relative w-full'>
                    <input type="text" placeholder='Unesite svoj email' className='w-full py-3 border rounded border-[#cecece] px-4  placeholder:text-base placeholder:text-[#cecece] placeholder:font-normal focus:outline-none' />
                    <button className='absolute right-3 top-1/2 -translate-y-1/2 z-10' type='button'>
                        <Image src={'/send.png'} width={28} height={34} />
                    </button>
                </form>
                <p className='text-[17px] text-black font-normal mb-3 mt-20'>Brza i laka kupovina Vaših omiljenih artikala <br /> putem mobilne aplikacije.</p>
                <div className='flex items-center gap-7'>
                    <Image src={'/app-store.png'} width={120} height={40} />
                    <Image src={'/google-play.png'} width={120} height={40} />
                </div>
                <p className='text-base text-black mt-14 font-normal'>Podelite svoje jedinstveno onlajn iskustvo sa našim <br /> timom i pomozite nam da ostanemo bolji.</p>
                <Link href='/' className='text-base text-black mt-5 font-bold underline block'>Ostavite vaše mišljenje</Link>
            </div>
            <div>
                <InstragramSection />
            </div>
        </div >
    )
}

export default NewsLetterInstagramSection