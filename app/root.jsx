import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError
} from "@remix-run/react";

import "./tailwind.css";
import styles from "./styles/main.css?url";
import Header, { links as headerLinks } from "./components/Header/Header";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1" 
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links = () => [
  ...headerLinks(),
  { rel: "stylesheet", href: styles },
];

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Oops!</title>
      </head>
      <body>
        <main className="error">
          {isRouteErrorResponse(error) ? (
            <>
              <h1>Oops!</h1>
              <p>{error.status}</p>
              <p>{error.statusText}</p>
              <p>
                Back to <Link to="/" id="link">safety!</Link>
              </p>
            </>
          ) : error instanceof Error ? (
            <>
              <p>{error.message}</p>
            </>
          ) : "Unknown Error"}        
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
