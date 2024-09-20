import { json } from "@remix-run/node";
import { Link, isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";
import styles from "../styles/movie-details.css?url";

export const loader = async ({ params }) => {
  try {
    const res = await fetch(`https://freetestapi.com/api/v1/movies/${params.id}`);
    const movie = await res.json();
    return json(movie);
  } catch(err) {
    console.log(err);
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
};

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  return (
    <section className="movie_section">
      <div className="movie_hero">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="movie_info">
        <div className="movie_headline">
          <h6 className="movie_year">
            {movie.year}
          </h6>
          <h2 className="movie_title">
            {movie.title}
          </h2>
        </div>
        <p className="movie_about">{movie.plot}</p>
      </div>
    </section>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary() {
  const error = useRouteError();

  const link = {
    color: "#8f42dd",
    textDecoration: "underline",
  };

  return (
    <main className="error">
      {isRouteErrorResponse(error) ? (
        <>
          <h1>Oops!</h1>
          <p>{error.status}</p>
          <p>{error.statusText}</p>
          <p>
            Back to <Link to="/" style={link}>safety!</Link>
          </p>
        </>
      ) : (
        <>
          <h1>An error occurred!</h1>
        </>
      )}
    </main>
  );
}
