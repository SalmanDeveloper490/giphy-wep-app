import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  pageSelected,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="app__pagination">
      <ul className="pagination justify-content-center py-3">
        {pageNumbers.map((number) => (
          <li
            className="page-link"
            key={number}
            onClick={() => pageSelected(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
