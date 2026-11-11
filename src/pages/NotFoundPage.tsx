import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="empty">
      <h1>404</h1>
      <p>{t("notfound.text")}</p>
      <Link to="/" className="btn">
        {t("notfound.back")}
      </Link>
    </section>
  );
}