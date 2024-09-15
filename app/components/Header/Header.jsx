import { RiMovie2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { Link } from "@remix-run/react";
import "./Header.css";

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
        <FaSearch className="search" />
      </div>
    </header>
  );
}
