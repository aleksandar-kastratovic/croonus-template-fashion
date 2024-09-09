import { get as GET } from "@/api/api";
import Link from "next/link";
import SinglePost from "@/components/Blog/SinglePost";
import { headers } from "next/headers";

const getBlogPost = async (slug) => {
  return await GET(`/news/details/${slug}`).then((res) => res?.payload);
};

const BlogPostDetails = async ({ params: { slug } }) => {
  const post = await getBlogPost(slug);
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <Link className={`text-[0.95rem]`} href={`/blog`}>
            Blog
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>{post?.basic_data?.title}</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          {post?.basic_data?.title}
        </h1>
      </div>
      <SinglePost post={post} />
    </>
  );
};

export default BlogPostDetails;

export const generateMetadata = async ({ params: { slug } }) => {
  let blog_post = await getBlogPost(slug);
  const headersList = headers();
  let canonical = headersList.get("x-pathname");
  if (blog_post) {
    const {
      basic_data: { title, short_description },
      images: { thumb_image },
    } = blog_post;

    return {
      title: `${title} | Fashion Template`,
      description: short_description,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: canonical,
      },
      openGraph: {
        title: `${title} | Fashion Template`,
        description: short_description,
        type: "article",
        images: [
          {
            url: thumb_image ?? "",
            width: 800,
            height: 600,
          },
        ],
        site_name: "Fashion Template",
        locale: "sr_RS",
      },
    };
  }
};
