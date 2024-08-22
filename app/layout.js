import { CartContextProvider } from "@/api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import TrackingScripts from "@/components/GTAG/GTAG";
import { UserProvider } from "@/context/userContext";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import Header from "@/components/Header/Header";
import { get } from "@/api/api";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          crossOrigin="anonymous"
          src="https://kit.fontawesome.com/f141ac3909.js"
        />{" "}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="relative">
        <QueryProvider>
          <UserProvider>
            <CartContextProvider>
              {/*<TrackingScripts />*/}
              <Header />
              <NavigationMobile />
              {children}
              <Footer />
              <ToastContainer />
            </CartContextProvider>
          </UserProvider>
        </QueryProvider>
        <CookieAlert />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Početna | Fashion Template",
  description: "Dobrodošli na Fashion Template Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Fashion Template - Farmerke, Muške farmerke, Muška odeća",
    description: "Dobrodošli na Fashion Template Online Shop",
    type: "website",
    url: "https://croonus.com",
    image: "https://croonus.com/images/logo.png",
    site_name: "croonus.com",
    locale: "sr_RS",
  },
};
