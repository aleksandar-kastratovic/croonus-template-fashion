"use client";

export const Pagination = ({
  getPaginationArray = (r, m) => {},
  data,
  setPage,
}) => {
  return (
    <div
      className={`flex mt-10 py-2 px-[3rem] bg-[#f2f2f2] items-center justify-end gap-1`}
    >
      {getPaginationArray(
        data.pagination.selected_page,
        data.pagination.total_pages
      )?.map((num, index, array) => (
        <>
          {index === 0 && num !== 1 && (
            <>
              <span
                className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg`}
                onClick={() => {
                  setPage(1);
                  window.scrollTo(0, 0);
                }}
              >
                1
              </span>
              {num - 1 !== 1 && (
                <span className={`select-none py-1 px-3 rounded-lg`}>...</span>
              )}
            </>
          )}
          {index > 0 && num - array[index - 1] > 1 && (
            <span className={`select-none py-1 px-3 rounded-lg`}>...</span>
          )}
          <span
            className={`${
              num === data.pagination.selected_page
                ? "cursor-pointer select-none bg-[#04b400] py-1 px-3 rounded-lg text-white"
                : "cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg"
            }`}
            onClick={() => {
              setPage(num);
              window.scrollTo(0, 0);
            }}
          >
            {num}
          </span>
          {index === array.length - 1 &&
            num !== data.pagination.total_pages && (
              <>
                {data.pagination.total_pages - num !== 1 && (
                  <span className={`select-none py-1 px-3  rounded-lg`}>
                    ...
                  </span>
                )}
                <span
                  className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-[#04b400] hover:text-[#04b400] rounded-lg`}
                  onClick={() => {
                    setPage(data.pagination.total_pages);
                    window.scrollTo(0, 0);
                  }}
                >
                  {data.pagination.total_pages}
                </span>
              </>
            )}
        </>
      ))}
    </div>
  );
};
