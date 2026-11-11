import { Link, NavLink, Outlet } from "react-router-dom";
import { HANDLE } from "../config";

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="brand">
            Questlog
          </Link>
          <nav className="nav" aria-label="Main menu">
            <NavLink to="/" end className="nav__link">
              All games
            </NavLink>
            <NavLink to="/games/new" className="nav__link">
              Add game
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">Game shelf for @{HANDLE}</footer>
    </div>
  );
}