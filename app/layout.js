import NavigationDesktop from "@/components/Navigation/NavigationDesktop";
import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import TrackingScripts from "@/components/GTAG/GTAG";
import { UserProvider } from "@/context/userContext";

export default function RootLayout({ children }) {
  return (
    <UserProvider>
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
            <link
              href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            ></link>
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
    </UserProvider>
  );
}
