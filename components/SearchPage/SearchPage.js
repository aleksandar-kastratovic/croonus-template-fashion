"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { list } from "@/app/api/api";
import Thumb from "../Thumb/Thumb";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/no-results.png";
const SearchPage = () => {
  const params = useSearchParams();
  const search = params.get("search");
  const [returnedProducts, setReturnedProducts] = useState([]);
  useEffect(() => {
    const getProducts = async (search) => {
      const getProducts = await list("/products/search/list", { search }).then(
        (response) => setReturnedProducts(response?.payload?.items)
      );
    };
    getProducts(search);
  }, []);
  return (
    <>
      {returnedProducts?.length > 0 ? (
        <div className="mt-[1.2rem] gap-y-[20px] gap-x-5 lg:mt-[9rem] mx-[0.625rem] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <h1 className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 font-bold text-[1.5rem] py-3">
            Rezultati pretrage za termin "{search}"
          </h1>
          <Thumb data={returnedProducts} slider={false} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center py-10 text-center mt-[1.2rem] lg:mt-[13rem] max-md:w-[95%] mx-auto">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#f8f8f8] p-6">
              <div>
                <Image src={Image1} alt="404" width={130} height={130} />
              </div>
              <div>
                <p className="text-lg font-medium">
                  Vaša pretraga nije dala nikakve rezultate.
                </p>
                <p className="text-sm">
                  Trenutno ne postoji rezultat za Vašu pretragu "{search}".
                </p>
                <p className="mt-4 text-lg font-medium">Pomoć u pretrazi:</p>
                <ul className="text-sm">
                  <li className="mt-2">• Proverite greške u kucanju.</li>
                  <li className="mt-2">
                    • Koristite više generčkih termina za pretragu.
                  </li>
                  <li className="mt-2">
                    • Proizvod ili kategorija koju tražite možda nisu još uvek
                    dostupni na našoj online prodavnici.
                  </li>
                  <li className="mt-2">
                    • Ukoliko Vam je potrebna pomoć, u svakom trenutku nas
                    možete kontaktirati pozivom na broj call centra
                  </li>
                </ul>
              </div>
              <div>
                <Link href="/">
                  <button className="bg-[#2bc48a] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                    Vrati se na početnu stranu
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchPage;
