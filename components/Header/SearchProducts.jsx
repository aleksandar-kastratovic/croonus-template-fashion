"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { list } from "@/app/api/api";
import Link from "next/link";
import { currencyFormat } from "@/helpers/functions";

const SearchProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (searchTerm?.length > 0) {
            const getData = async (search) => {
                console.log(search)
                await list(`/products/search/list`, {
                    search: search,
                }).then((response) => {
                    console.log(response)
                    setSearchData(response?.payload);
                    setLoading(false);
                });
            };
            getData(searchTerm);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?search=${searchTerm}`);
        setSearchTerm("");
    };


    console.log(searchData)

    return (
        <div className="py-4 w-1/5 rounded-[10px] bg-topHeader relative">
            <form
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    placeholder="PRETRAGA"
                    className='w-full h-full rounded-[10px] px-5 absolute top-0 left-0 bg-transparent text-sm font-normal border-0 text-black focus:outline-none focus:border-0  focus:ring-0'
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                        setLoading(true);
                    }}
                    value={searchTerm}
                />
                <div className='absolute right-2 top-1/2 -translate-y-1/2 py-2'>
                    <Image src={'/search.png'} width={20} height={20} className='object-cover' alt='search' />
                </div>
                <div
                    className={`${searchTerm?.length > 0
                        ? `absolute flex flex-col h-[420px] hidescrollbar overflow-y-auto bg-white top-[30px] right-0 w-full border rounded-b-lg`
                        : `hidden`
                        } `}
                >
                    {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
                        <div className="w-[95%] mx-auto mt-5">
                            <h1 className="text-[1rem] font-normal">
                                Rezultati pretrage
                            </h1>
                            <div className="flex flex-col gap-5 mt-3 pb-5">
                                {searchData?.items?.slice(0, 6)?.map((item) => {
                                    return (
                                        <Link
                                            href={`/proizvod/${item?.slug_path}`}
                                            onClick={(e) => {
                                                setSearchData([]);
                                                setSearchOpen(false);
                                                handleSearch(e);
                                                setSearchTerm("");
                                            }}
                                        >
                                            <div className="flex flex-row items-center gap-5">
                                                <div className="w-[60px] h-[60px] relative">
                                                    <Image
                                                        src={item.image[0]}
                                                        alt={``}
                                                        fill
                                                        className={`object-cover rounded-full`}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h1 className="text-[0.9rem] font-normal">
                                                        {item?.basic_data?.name}
                                                    </h1>
                                                    <h1 className="text-[0.9rem] w-fit bg-[#f8ce5d] px-2 font-bold text-center">
                                                        {currencyFormat(
                                                            item?.price?.price?.discount ??
                                                            item?.price?.price?.original
                                                        )}
                                                    </h1>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {loading && (
                        <div className={`w-[95%] mx-auto text-center mt-5`}>
                            <i
                                className={`fas fa-spinner fa-spin text-xl text-black`}
                            ></i>
                        </div>
                    )}
                    {!loading && (
                        <div
                            className={`sticky bottom-0 w-full bg-croonus-2 py-2 mt-auto text-center hover:bg-opacity-80`}
                        >
                            <button
                                onClick={() => {
                                    handleSearch();
                                    setSearchData([]);
                                }}
                                className={`text-white w-full h-full font-light text-center`}
                            >
                                Prikaži sve rezultate (
                                {searchData?.pagination?.total_items > 10
                                    ? `još ${searchData?.pagination?.total_items - 10}`
                                    : `Pretraži`}
                                )
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SearchProducts