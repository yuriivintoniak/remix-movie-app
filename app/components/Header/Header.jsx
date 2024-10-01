import { RiMovie2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "@remix-run/react";
import styles from "./Header.css?url";

export default function Header() {
  return (
    <header className="header">
      <div>
        <Link className="logo">
          <RiMovie2Fill style={{color: "#0a78ff"}} /> 
          <span>Movies</span>
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav_list">
          <li className="nav_link">
            <Link>
              Home
            </Link>
          </li>
          <li className="nav_link">
            <Link>
              Movies
            </Link>
          </li>
          <li className="nav_link">
            <Link>
              Serials
            </Link>
          </li>
          <li className="nav_link">
            <Link>
              Genres
            </Link>
          </li>
          <li className="nav_link">
            <Link>
              Novelties
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Link to={`/search`}>
          <RiSearch2Line className="search" />
        </Link>
      </div>
    </header>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
