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
import { get } from "@/app/api/api";
import { QueryProvider } from "@/components/QueryProvider";
const getCategories = async () => {
  return await get("/categories/product/tree").then(
    (response) => response?.payload
  );
};
export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <QueryProvider>
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
              {/*<TrackingScripts />*/}
              <Header categories={categories} />
              <NavigationMobile categories={categories} />

              {children}
              <Footer />
              <CookieAlert />
            </body>
          </html>
        </CartContextProvider>
      </UserProvider>
    </QueryProvider>
  );
}

export const metadata = {
  title: "Početna - Fashion Template",
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
