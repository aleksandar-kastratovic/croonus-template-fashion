import Banners from '@/components/sections/homepage/Banners'
import NewCategoriesSections from '@/components/sections/homepage/NewCategoriesSection'
import NewsLetterInstagramSection from '@/components/sections/homepage/NewsLetterInstagramSection'
import RecommendedCategories from '@/components/sections/homepage/RecommendedCategories'
import RecommendedProducts from '@/components/sections/homepage/RecommendedProducts'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="">
      <section className="block relative overflow-hidden">
        <Suspense fallback={<div className='max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] w-full bg-gray-200 animate-pulse '></div>}>
          <Banners />
        </Suspense>
        <Suspense fallback={<div className='max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] w-full bg-gray-200 animate-pulse '></div>}>
          <RecommendedProducts />
        </Suspense>
        <Suspense fallback={<div className='max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] w-full bg-gray-200 animate-pulse '></div>}>
          <RecommendedCategories />
        </Suspense>
        <Suspense fallback={<div className='max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] w-full bg-gray-200 animate-pulse '></div>}>
          <NewCategoriesSections />
        </Suspense>
        <Suspense fallback={<div className='max-sm:h-[400px] md:h-[510px] lg:h-[690px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1057px] w-full bg-gray-200 animate-pulse '></div>}>
          <NewsLetterInstagramSection />
        </Suspense>
      </section>
    </main>
  )
}
