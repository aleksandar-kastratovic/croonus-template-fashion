import WishlistPage from "@/components/Wishlist/Wishlist";
export const metadata = () => {
  return {
    title: "Lista želja - Pazari.rs - Farmerke, Muške farmerke, Muška odeća",
    description: "Dobrodošli na Pazari.rs Online Shop",
    keywords: [
      "pazari",
      "online",
      "shop",
      "pazari.rs",
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
