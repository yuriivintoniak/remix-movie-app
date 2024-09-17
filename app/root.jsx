import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import styles from "./styles/main.css";
import Header from "./components/Header/Header";

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
        <main>
          <Header />
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}
