import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "../styles/index.css?url";
import MovieCard, { links as movieCardLinks } from "../components/MovieCard/MovieCard";
import Pagination, { links as paginationLinks } from "../components/Pagination/Pagination";

export const meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" },
];

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    const queryParams = {
      s: "movie",
      apikey: API_KEY,
      page: params.get("page") || 1,
    };

    Object.entries(queryParams).forEach(([key, value]) => params.set(key, value));

    const res = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();

    if (!data.Search) {
      throw new Error("No movies found");
    }
    return json({
      movies: data.Search,
      totalResults: data.totalResults,
      currentPage: Number(queryParams.page),
    });
  } catch (error) {
    console.error(error);
    throw new Response(error.message || "Internal Server Error", { status: 500 });
  }
}

export default function Index() {
  const { movies, totalResults, currentPage } = useLoaderData();
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard 
              id={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
            />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage} totalPages={totalPages} 
      />
    </div>
  );
}

export const links = () => [
  ...movieCardLinks(),
  ...paginationLinks(),
  { rel: "stylesheet", href: styles },
];
