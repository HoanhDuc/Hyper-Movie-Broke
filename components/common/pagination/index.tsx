import "@/components/common/pagination/index.scss";
import React from "react";
import Pagination from "rc-pagination";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItem?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
}

const PaginationCpn: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  totalItem,
  pageSize = 24,
  onChange,
}) => {
  const onChangePage = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    onChange && onChange(page);
  };

  return (
    <div className="md:flex justify-between items-center mt-5">
      <p className="mb-0">
        Showing{" "}
        <span className="text-green-500">
          {pageSize}/{totalItem}{" "}
        </span>
        Result(s)
      </p>
      <Pagination
        className="pagination-data"
        onChange={onChangePage}
        current={currentPage}
        total={totalItem}
        pageSize={pageSize}
        showSizeChanger={false}
        prevIcon={<p className="text-hyper-movie font-bold text-3xl">-</p>}
        nextIcon={<p className="text-hyper-movie font-bold text-3xl">+</p>}
      />
    </div>
  );
};

export default PaginationCpn;
