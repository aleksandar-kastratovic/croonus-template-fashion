"use client";

import { getActiveTab, useTabChange } from "@/_pages/account/sidebar";
import { Button } from "@/_pages/account/account-data/shared";
import buttons from "./buttons.json";

export const Sidebar = () => {
  return (
    <div
      className={`col-span-5 max-sm:row-start-2 sm:col-span-1 flex flex-col gap-3 p-4 bg-white rounded-lg shadow`}
    >
      {(buttons ?? [])?.map(({ tab, id, title }) => {
        return (
          <Button id={id} key={id} tab={tab} title={title} type={`sidebar`} />
        );
      })}
    </div>
  );
};
