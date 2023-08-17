import LandingPage from "@/components/PromoPage/LandingPage";

const PromoPage = async ({ params: { slug } }) => {
  return (
    <>
      <LandingPage slug={slug} />
    </>
  );
};

export default PromoPage;

export const metadata = {
  title: "Promocije",
  description: "Promocije",
};
