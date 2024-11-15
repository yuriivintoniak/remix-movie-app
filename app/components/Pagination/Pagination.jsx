import { Link } from "@remix-run/react";
import styles from "./Pagination.css?url";

export default function Pagination({ currentPage, totalPages }) {
  const isPrevPageAvailable = currentPage > 1;
  const isNextPageAvailable = currentPage < totalPages;

  const prevPageUrl = `?page=${currentPage - 1}`;
  const nextPageUrl = `?page=${currentPage + 1}`;

  return (
    <div className="pagination">
      {isPrevPageAvailable && (
        <Link to={prevPageUrl}>
          <span>&lt;</span>
        </Link>
      )}
      <p>{currentPage} of {totalPages}</p>
      {isNextPageAvailable && (
        <Link to={nextPageUrl}>
          <span>&gt;</span>
        </Link>
      )}
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
