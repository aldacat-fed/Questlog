import { Link, NavLink, Outlet } from "react-router-dom";
import { HANDLE } from "../config";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Layout() {
  const { t } = useLanguage();

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="brand">
            Questlog
          </Link>
          <div className="header__right">
            <nav className="nav" aria-label={t("nav.main")}>
              <NavLink to="/" end className="nav__link">
                {t("nav.all")}
              </NavLink>
              <NavLink to="/games/new" className="nav__link">
                {t("nav.add")}
              </NavLink>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">{t("footer.text", { handle: HANDLE })}</footer>
    </div>
  );
}