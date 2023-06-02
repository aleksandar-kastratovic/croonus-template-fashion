"use client";

import Link from "next/link";

const underConstruction = () => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center mt-[2rem] md:mt-[9rem]`}
    >
      <h1 className={`text-2xl font-bold`}>Stranica u izradi.</h1>
      <Link href="/">
        <button className="bg-[#2bc48a] mt-5 px-10 font-medium text-white hover:bg-opacity-80 py-4">
          Vrati se na početnu stranu
        </button>
      </Link>
    </div>
  );
};

export default underConstruction;
