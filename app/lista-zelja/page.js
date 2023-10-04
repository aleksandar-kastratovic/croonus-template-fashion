import WishlistPage from "@/components/Wishlist/Wishlist";
export const metadata = () => {
  return {
    title: "Lista želja - croonus.com - Farmerke, Muške farmerke, Muška odeća",
    description: "Dobrodošli na croonus.com Online Shop",
    keywords: [
      "pazari",
      "online",
      "shop",
      "croonus.com",
      "farmerke",
      "trenerke",
      "dukserice",
      "pazari obuca",
      "obuca",
      "pazari online",
    ],
  };
};
const Wishlist = async () => {
  return <WishlistPage />;
};

export default Wishlist;
