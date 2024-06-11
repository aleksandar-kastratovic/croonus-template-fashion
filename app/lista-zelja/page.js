import WishlistPage from "@/components/Wishlist/Wishlist";
export const metadata = () => {
  return {
    title: "Lista želja | Fashion Template",
    description: "Dobrodošli na Fashion Online Shop",
    keywords: [
      "Croonus",
      "online",
      "shop",
      "croonus.com",
      "farmerke",
      "trenerke",
      "dukserice",
      "Croonus obuca",
      "obuca",
      "Croonus online",
    ],
  };
};
const Wishlist = async () => {
  return <WishlistPage />;
};

export default Wishlist;
