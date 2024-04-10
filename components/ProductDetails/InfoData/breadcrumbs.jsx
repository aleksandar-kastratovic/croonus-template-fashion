'use client'
import Link from "next/link";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";

export const Breadcrumbs = ({ path }) => {
  const { data: breadcrumbs } = useSuspenseQuery({
    queryKey: ["breadcrumbs", path],
    queryFn: async () => {
      return await get(`/product-details/breadcrumbs/${path}`).then(
        (res) => res?.payload
      );
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Link href={`/`} className="text-[#191919] text-[0.95rem] font-normal">
        Početna
      </Link>{" "}
      <>/</>
      {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              href={
                index === arr.length - 1
                  ? `/kategorije/${breadcrumb?.slug}`
                  : `/kategorije/${breadcrumb?.slug}`
              }
              className="text-[#000] text-[0.95rem] font-normal "
            >
              {breadcrumb?.name}
            </Link>
            {index !== arr.length - 1 && <>/</>}
          </div>
        );
      })}
      <>/</>
      <h1 className="text-[#000] text-[0.95rem] font-normal">
        {breadcrumbs?.end?.name}
      </h1>
    </div>
  );
};
