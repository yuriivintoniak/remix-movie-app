import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "../styles/movie-details.css";

export const loader = async ({ params }) => {
  const res = await fetch(`https://freetestapi.com/api/v1/movies/${params.id}`);
  const movie = await res.json();
  return json(movie);
};

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  return (
    <section className="movie_section">
      <div className="movie_hero">
        <img className="movie_heroImage" src={movie.poster} alt={movie.title} />
      </div>
      <div className="movie_info">
        <div className="movie_headline">
          <h6 className="movie_year">{movie.year}</h6>
          <h2 className="movie_title">{movie.title}</h2>
        </div>
        <p className="movie_about">{movie.plot}</p>
      </div>
    </section>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
