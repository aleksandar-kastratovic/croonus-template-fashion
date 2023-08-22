import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import TrackingScripts from "@/components/GTAG/GTAG";

export default function RootLayout({ children }) {
  return (
    <CartContextProvider>
      <html lang="en">
        <head>
          <Script
            crossOrigin="anonymous"
            src="https://kit.fontawesome.com/f141ac3909.js"
          />{" "}
          <link
            rel="stylesheet"
            href="https://unpkg.com/aos@next/dist/aos.css"
          />
        </head>
        <body className="">
          <TrackingScripts />
          <NavigationDesktop />
          <NavigationMobile />
          {children}
          <Footer />
        </body>
      </html>
    </CartContextProvider>
  );
}
