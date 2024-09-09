import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta = () => {
  return [{ title: "Movies" }]
}

export async function loader() {
  const res = await fetch("https://freetestapi.com/api/v1/movies?limit=10");
  return json(await res.json());
}

export default function Movies() {
  const movies = useLoaderData();

  return (
    <div>
      <h1 className="m-5 text-3xl">
        Movies:
      </h1>
      <ul className="m-5">
        {movies.map((movie) => (
          <li key={movie.id} className="p-1">
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
