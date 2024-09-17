import "../styles/index.css"
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MovieCard, { links as movieCardLinks } from "../components/MovieCard/MovieCard";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const res = await fetch("https://freetestapi.com/api/v1/movies?limit=20");
  return json(await res.json());
}

export default function Index() {
  const movies = useLoaderData();

  return (
    <div>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard id={movie.id} poster={movie.poster} />
          </li>
        ))}
      </ul> 
    </div>
  );
}

export function links() {
  return [...movieCardLinks()];
}
