import { Link } from "@remix-run/react";
import styles from "./Pagination.css?url";

export default function Pagination({ currentPage, totalPages }) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`?page=${currentPage - 1}`}>
          <span>&lt;</span>
        </Link>
      )}
      <p>{currentPage} of {totalPages}</p>
      {currentPage < totalPages && (
        <Link to={`?page=${currentPage + 1}`}>
          <span>&gt;</span>
        </Link>
      )}
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
