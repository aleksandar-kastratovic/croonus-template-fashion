import { CartContextProvider } from "./api/cartContext";
import "./globals.css";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import TrackingScripts from "@/components/GTAG/GTAG";
import { UserProvider } from "@/context/userContext";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import Header from "@/components/Header/Header";
import HeaderModal from "@/components/Header/HeaderModal";

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
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/FBXLoader.js"></script>*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/MTLLoader.js"></script>*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/OBJLoader.js"></script>*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js"></script>*/}
            {/*<script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/libs/fflate.min.js"></script>*/}
          </head>
          <body className="relative">
            <TrackingScripts />
            <Header />
            <NavigationMobile />
            <div className="relative">
              <HeaderModal />
              {children}
            </div>
            <Footer />
            <CookieAlert />
          </body>
        </html>
      </CartContextProvider>
    </UserProvider>
  );
}
