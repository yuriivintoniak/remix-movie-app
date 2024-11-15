import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "../styles/index.css?url";
import MovieCard, { links as movieCardLinks } from "../components/MovieCard/MovieCard";
import Pagination, { links as paginationLinks } from "../components/Pagination/Pagination";

export const meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" },
];

const apiKey = process.env.OMDB_API_KEY;
const baseUrl = "http://www.omdbapi.com/";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = new URLSearchParams(url.search).get("page") || 1;
    const res = await fetch(
      `${baseUrl}?s=movie&apikey=${apiKey}&page=${page}`
    );
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
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    throw new Response({
      status: error.status,
      statusText: error.statusText,
    });
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
