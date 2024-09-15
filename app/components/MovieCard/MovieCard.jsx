import "./MovieCard.css";
import { Link } from "@remix-run/react";

export default function MovieCard(props) {
  console.log(props);
  const movie = props;
  console.log(movie);
  return (
    <Link to={`/movies/${movie.id}`}>
      <img src={movie.poster} alt="Movie" />  
    </Link> 
  );
}
