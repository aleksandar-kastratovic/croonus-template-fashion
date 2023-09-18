import { list } from "@/app/api/api";
import Thumb from "@/components/product/Thumb";

const getNew = async () => {
    return await list("/products/new-in/list").then((res) => res?.payload?.items);
};

const RecommendedProducts = async () => {
    const products = await getNew();

    return (
        <div
            className="max-sm:w-[95%] max-sm:mx-auto md:mx-[5rem] max-sm:mt-[3rem] md:mt-[8.75rem]"
        >
            <h1 className="text-[1.5rem] font-bold max-md:text-[1.1rem]">
                Izdvajamo za vas
            </h1>
            <div className="max-sm:mt-[1rem] mt-[2.5rem]">
                <Thumb slider={true} data={products} />
            </div>
        </div>
    );
};

export default RecommendedProducts;