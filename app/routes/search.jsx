import { 
  Form, 
  isRouteErrorResponse, 
  json, 
  Link, 
  useLoaderData, 
  useRouteError 
} from "@remix-run/react";
import "../styles/search.css";
import errorStyles from "../styles/main.css?url";
import { RiSearch2Line } from "react-icons/ri";
import MovieCard, { links as movieCardLinks } from "../components/MovieCard/MovieCard";

export const loader = async({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  try {
    const movies = await fetch(
      `https://freetestapi.com/api/v1/movies?search=${query}`
    );
    return json(await movies.json());
  } catch (error) {
    console.log(error);
    throw new Response({
      status: error.status,
      statusText: error.statusText,
    });
  }
}

export default function Search() {
  const movies = useLoaderData();

  return (
    <div>
      <Form method="get" id="search-form">
        <RiSearch2Line id="search-icon" />  
        <input 
          type="text"
          id="query"
          name="query"
          autoComplete="off"
          aria-label="Search movie"
          placeholder="Search for a movie..." 
        />
      </Form>
      <div>
        {movies.length ? (
          <ul className="search-container">
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard
                  id={movie.id} 
                  title={movie.title} 
                  poster={movie.poster} 
                />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h1>Movie not found</h1>
          </>
        )}
      </div>
    </div>
  );
}

export const links = () => [
  ...movieCardLinks(),
  { rel: "stylesheet", href: errorStyles },
];

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
