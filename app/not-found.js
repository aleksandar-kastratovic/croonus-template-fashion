import Link from "next/link";

const notFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center pt-[500px]">
      <h1 className="font-bold text-[18px]">
        Stranica koju tražite ne postoji ili je premeštena.
      </h1>
      <h2 className="font-normal text-[15px] mt-3">
        Proverite da li ste uneli ispravan URL.
      </h2>
      <Link href="/">
        <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
          Vrati se na početnu stranu
        </button>
      </Link>
    </div>
  );
};

export default notFound;
