import StaticPage from "@/components/StaticPage/StaticPage";
import { get, list } from "@/api/api";
import { headers } from "next/headers";

const getBasicData = async (slug) => {
  return await get(`/static-pages/content/${slug}`)?.then(
    (res) => res?.payload
  );
};

const getData = (slug) => {
  return list(`/static-pages/content/${slug}`).then((res) => {
    return res?.payload;
  });
};

const DynamicStaticPage = async ({ params: { slug } }) => {
  const data = await getData(slug);
  console.log(data);
  return <StaticPage slug={slug} data={data} />;
};

export default DynamicStaticPage;

export const generateMetadata = async ({ params: { slug } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  let static_page = await getBasicData(slug);

  if (static_page) {
    const {
      basic_data: { name },
      seo: { meta_title, meta_keywords, meta_description, meta_url },
    } = static_page;

    return {
      title: `${meta_title ?? name} | Fashion Template`,
      description: "Dobrodošli na Fashion Template Online Shop",
      alternates: {
        canonical: meta_url ?? canonical,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: `${meta_title ?? name} | Fashion Template`,
        description: "Dobrodošli na Fashion Template Online Shop",
        type: "website",
        images: [
          {
            url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
            width: 800,
            height: 600,
            alt: `Fashion Template`,
          },
        ],
        locale: "sr_RS",
      },
    };
  }
};
