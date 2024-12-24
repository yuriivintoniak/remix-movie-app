import { RiMovie2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { Form, Link } from "@remix-run/react";
import styles from "./Header.css?url";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Serials", path: "/serials" },
  { name: "Genres", path: "/genres" },
  { name: "Novelties", path: "/novelties" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <RiMovie2Fill style={{ color: "#0a78ff" }} /> 
        <span>Movies</span>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-link">
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="auth-links">
        <Form method="post" action="/logout">
          <button type="submit" className="auth">
            Log Out
          </button>
        </Form>
        <Link to={`/login`} className="auth">
          Log In
        </Link>
        <Link to={`/search`}>
          <RiSearch2Line className="search-icon" />
        </Link>
      </div>
    </header>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
