import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styles from "../styles/index.css?url";
import MovieCard, { links as movieCardLinks } from "../components/MovieCard/MovieCard";
import Pagination, { links as paginationLinks } from "../components/Pagination/Pagination";

export const meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" },
];

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const res = await fetch(
      `http://www.omdbapi.com/?s=movie&apikey=5ccd3d05&page=${page}`
    );
    const data = await res.json();

    return json({
      movies: data.Search,
      totalResults: data.totalResults,
      currentPage: page,
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
