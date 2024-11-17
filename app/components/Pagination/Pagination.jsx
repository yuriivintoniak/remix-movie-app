import { Link } from "@remix-run/react";
import styles from "./Pagination.css?url";

export default function Pagination({ currentPage, totalPages }) {
  const isPrevPageAvailable = currentPage > 1;
  const isNextPageAvailable = currentPage < totalPages;

  const getPageUrl = (offset) => `?page=${currentPage + offset}`;

  return (
    <div className="pagination">
      {isPrevPageAvailable && (
        <Link to={getPageUrl(-1)}>
          <span>&lt;</span>
        </Link>
      )}
      <p>{currentPage} of {totalPages}</p>
      {isNextPageAvailable && (
        <Link to={getPageUrl(1)}>
          <span>&gt;</span>
        </Link>
      )}
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
