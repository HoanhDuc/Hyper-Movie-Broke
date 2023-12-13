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
      top: window.innerHeight - 100,
      behavior: "smooth",
    });
    onChange && onChange(page);
  };

  return (
    <Pagination
      className="pagination-data mt-5 justify-center"
      onChange={onChangePage}
      current={currentPage}
      total={totalItem}
      pageSize={pageSize}
      showSizeChanger={false}
      prevIcon={<p className="text-hyper-movie font-bold text-3xl">-</p>}
      nextIcon={<p className="text-hyper-movie font-bold text-3xl">+</p>}
    />
  );
};

export default PaginationCpn;
