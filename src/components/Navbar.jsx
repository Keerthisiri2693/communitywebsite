import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >

          <span className="navbar-logo-icon">
            🌙
          </span>

          <span className="navbar-logo-text">
            Our Community
          </span>

        </Link>


        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav
          className={`navbar-menu ${
            menuOpen ? "navbar-menu-open" : ""
          }`}
        >

          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            About
          </NavLink>


          <NavLink
            to="/services"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Services
          </NavLink>


          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Contact
          </NavLink>

        </nav>


        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >

          <span
            className={
              menuOpen ? "line line-one open" : "line line-one"
            }
          />

          <span
            className={
              menuOpen ? "line line-two open" : "line line-two"
            }
          />

          <span
            className={
              menuOpen
                ? "line line-three open"
                : "line line-three"
            }
          />

        </button>

      </div>

    </header>
  );
}

export default Navbar;
