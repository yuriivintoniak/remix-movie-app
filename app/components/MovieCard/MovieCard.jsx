import { Link } from "@remix-run/react";
import styles from "./MovieCard.css?url";

export default function MovieCard({ id, title, poster }) {
  return (
    <div className="card">
      <Link to={`/movies/${id}`}>
        <img className="card-image" src={poster} alt={title} />  
      </Link> 
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
