import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <div className="flex justify-center mt-auto ">
      <ReactPaginate
        previousLabel={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        nextLabel={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={"flex justify-center space-x-2 mt-4"}
        pageClassName={"px-3 py-1 border rounded-lg"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"px-3 py-1 border rounded-lg flex items-center"}
        nextClassName={"px-3 py-1 border rounded-lg flex items-center"}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default PaginationComponent;
