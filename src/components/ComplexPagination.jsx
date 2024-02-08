import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPagination = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  // if (pageCount < 2) return null;

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button key={pageNumber} className={`join-item btn btn-xs sm:btn-md border-none  ${activeClass ? "bg-base-300 border-base-300" : ""}`} onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-sm sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    if (page != 1 && page != pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-sm sm:btn-md" key="dots-2">
          ...
        </button>
      );
    }

    if (pageCount != 1) {
      pageButtons.push(addPageButton({ pageNumber: pageCount, activeClass: page === pageCount }));
    }
    return pageButtons;
  };

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="join-item btn btn-sm sm:btn-md "
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = 1;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>

        {renderPageButtons()}

        <button
          className="join-item btn btn-sm sm:btn-md "
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = pageCount;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPagination;
