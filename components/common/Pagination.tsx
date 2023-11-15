import React from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="pagination">
        {range(1, totalPages).map((page) => (
          <li key={page} className={page === currentPage ? "active" : ""}>
            <a
              href="#"
              className="block px-3 py-2 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
