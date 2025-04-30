"use client";

import React, { useMemo } from "react";

interface ListingPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ListingPagination: React.FC<ListingPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToShow = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    while (pages.length < 5 && pages[0] > 1) {
      pages.unshift(pages[0] - 1);
    }

    while (pages.length < 5 && pages[pages.length - 1] < totalPages) {
      pages.push(pages[pages.length - 1] + 1);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="listing__page__pagination">
      <button
        onClick={() => {
          if (currentPage === 1) return;
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="listing__page__pagination__button prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            "listing__page__pagination__button " +
            (currentPage === page ? "active" : "")
          }
        >
          {page}
        </button>
      ))}
      <button
        className="listing__page__pagination__button next"
        onClick={() => {
          if (currentPage === totalPages) return;
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default ListingPagination;
