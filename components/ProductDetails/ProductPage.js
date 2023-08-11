import { get, list } from "@/app/api/api";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";

const getProduct = async (slug) => {
  return await get(`/product-details/basic-data/${slug}`).then(
    (res) => res?.payload
  );
};

const getProductGallery = async (slug) => {
  return await get(`/product-details/gallery/${slug}`).then(
    (res) => res?.payload?.gallery
  );
};

const getProductLongDescription = async (slug) => {
  return await get(`/product-details/description/${slug}`).then(
    (res) => res?.payload
  );
};

const getNewProducts = async () => {
  return await list("/products/new-in/list").then((res) => res?.payload?.items);
};

export async function generateMetadata({ params: { path } }) {
  const product = await getProduct(path[path?.length - 1]);
  const productImage = await getProductGallery(path[path?.length - 1]);
  return {
    title: product?.data?.item?.basic_data?.name,
    description:
      product?.data?.item?.basic_data?.short_description ??
      "Pazari online Shop",

    openGraph: {
      title: product?.data?.item?.basic_data?.name,
      description:
        product?.data?.item?.basic_data?.short_description ??
        "Pazari online Shop",

      images: [
        {
          url: productImage?.image ?? "",
          width: 800,
          height: 600,
          alt: product?.data?.item?.basic_data?.name ?? "",
        },
      ],

      site_name: "Pazari.rs",
    },

    twitter: {
      handle: "@pazarirs",
      site: "@pazarirs",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
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
        ].join(", "),
      },
    ],
  };
}

const ProductPage = async ({ path }) => {
  const product = await getProduct(path);
  const productGallery = await getProductGallery(path);
  const desc = await getProductLongDescription(path);
  const newProducts = await getNewProducts();

  return (
    <div className="">
      <ProductDetails
        product={product}
        productGallery={productGallery}
        desc={desc}
        path={path}
      />
      <RecommendedProducts products={newProducts} />
    </div>
  );
};

export default ProductPage;
