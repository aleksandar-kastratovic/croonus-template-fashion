"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrumbs = ({ className, parents = [], name = "" }) => {
  const router = useRouter();
  return (
    <div
      className={`mx-auto mt-2 bg-[#f7f7f7] p-0.5 max-3xl:w-[95%] lg:mt-[5.35rem] 3xl:w-[91%] 4xl:w-[84%]`}
    >
      <div className={`flex flex-col items-center gap-1 sm:flex-row sm:gap-5`}>
        <div
          className={`flex cursor-pointer items-center gap-2 px-2 py-[0.275rem] hover:bg-white max-sm:mr-auto`}
          onClick={() => router.back()}
        >
          <i className={`fa fa-solid fa-chevron-left text-sm`}></i>
          <span className={`${className} text-[1rem] font-light`}>Nazad</span>
        </div>
        <div
          className={`flex flex-wrap items-center gap-[0.45rem] max-sm:mr-auto max-sm:pl-2`}
        >
          <Link
            href={`/`}
            className={`${className} font-light hover:underline`}
          >
            Početna &nbsp;/
          </Link>
          {parents?.map(({ id, name, slug }, index) => {
            const isLast = index === parents.length - 1;
            return (
              <div key={id}>
                <Link
                  href={`/${slug}`}
                  className={`${className} text-[1rem] font-light hover:underline`}
                >
                  {name}
                </Link>
                {!isLast && <span> / </span>}
              </div>
            );
          })}
          <h2 className={`${className}`}>
            {parents?.length > 0 && "/"} &nbsp;{name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
