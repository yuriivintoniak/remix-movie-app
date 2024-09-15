import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  const res = await fetch(`https://freetestapi.com/api/v1/movies/${params.id}`);
  const movie = await res.json();
  return json(movie);
};

export default function MovieDetail() {
  const movie = useLoaderData();

  return (
    <div>
      <h1 className="text-center text-5xl font-bold mt-20">Movie detail</h1>
      <img src={movie.poster} alt="Movie" />
    </div>
  );
}
