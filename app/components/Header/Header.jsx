import { RiMovie2Fill, RiSearch2Line } from "react-icons/ri";
import { Link } from "@remix-run/react";
import styles from "./Header.css?url";
import AuthButton from "../AuthButton/AuthButton";
import { links as authButtonLinks } from "../AuthButton/AuthButton";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Serials", path: "/serials" },
  { name: "Genres", path: "/genres" },
  { name: "Novelties", path: "/novelties" },
];

export default function Header({ session }) {
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
        <AuthButton session={session} />
        <Link to={`/search`}>
          <RiSearch2Line className="search-icon" />
        </Link>
      </div>
    </header>
  );
}

export const links = () => [
  ...authButtonLinks(),
  { rel: "stylesheet", href: styles },
];
