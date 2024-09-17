import { Link } from "@remix-run/react";
import styles from "./MovieCard.css";

export default function MovieCard(props) {
  const movie = props;
  
  return (
    <div className="card">
      <Link to={`/movies/${movie.id}`}>
        <img className="cardImage" src={movie.poster} alt="Movie" />  
      </Link> 
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
