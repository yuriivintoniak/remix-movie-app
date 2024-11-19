import { json } from "@remix-run/node";
import styles from "../styles/movie-details.css?url";
import { Link, isRouteErrorResponse, useRouteError, useLoaderData } from "@remix-run/react";

const apiKey = process.env.OMDB_API_KEY;
const baseUrl = "http://www.omdbapi.com/";

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    const queryParams = new URLSearchParams({
      i: id,
      apikey: apiKey,
    });

    const res = await fetch(`${baseUrl}?${queryParams.toString()}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`)
    }
    const movie = await res.json();

    if (!movie) {
      throw new Error("No movie found");
    }
    return json(movie);
  } catch (error) {
    console.error(error);
    throw new Response(error.message || "Internal Server Error", { status: 500 });
  }
};

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  return (
    <div className="movie-container">
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className="movie-details">
        <div className="movie-title">
          <h1>{movie.Title}</h1>
        </div>
        <div className="details-header">
          {movie.Year} &#x2022; {movie.Country} &#x2022; 
          Rating - <span className="movie-rating">{movie.imdbRating}</span>/10
        </div>
        <ul className="details-list">
          <li><strong>Actors: </strong>{movie.Actors}</li>
          <li><strong>Director: </strong>{movie.Director}</li>
          <li><strong>Writers: </strong>{movie.Writer}</li>
        </ul>
        <ul className="details-list">
          <li><strong>Genre: </strong>{movie.Genre}</li>
          <li><strong>Release Date: </strong>{movie.DVD}</li>
          <li><strong>Box Office: </strong>{movie.BoxOffice}</li>
          <li><strong>Movie Runtime: </strong>{movie.Runtime}</li>
        </ul>
        <p className="movie-plot">{movie.Plot}</p>
        <p className="movie-awards">{movie.Awards}</p>
      </div> 
    </div>
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
          <h1>Something went wrong!</h1>
        </>
      )}
    </main>
  );
}
