import Footer from '@/components/Footer'
import './globals.css'
import Header from '@/components/Header'
import { Open_Sans } from 'next/font/google'
import { CartContextProvider } from './api/cartContext'

//👇 Configure our font object
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Fashion Project',
  description: 'A fashion project',
}

export default function RootLayout({ children }) {
  return (
    <CartContextProvider>
      <html lang="en" className={openSans.className}>
        <body className='min-h-screen'>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </CartContextProvider>
  )
}
