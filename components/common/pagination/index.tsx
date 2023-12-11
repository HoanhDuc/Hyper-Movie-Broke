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

  return (
    <Pagination
      className="pagination-data mt-5 justify-center"
      onChange={onChange}
      current={currentPage}
      total={totalItem}
      pageSize={pageSize}
      showSizeChanger={false}
      prevIcon={<p className="text-red-600 font-bold">Pre</p>}
      nextIcon={<p className="text-red-600 font-bold">Next</p>}
    />
  );
};

export default PaginationCpn;
