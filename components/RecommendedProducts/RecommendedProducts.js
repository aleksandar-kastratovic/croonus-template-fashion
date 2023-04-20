import Thumb from "../Thumb/Thumb";

const RecommendedProducts = ({ products }) => {
  return (
    <div className="mx-[5rem] mt-[5.625rem]">
      <h1 className="text-[1.5rem] font-bold">Preporučeno za tebe</h1>
      <div className="mt-[2.5rem]">
        <Thumb slider={true} data={products} />
      </div>
    </div>
  );
};

export default RecommendedProducts;
