import { useLanguage } from "../hooks/useLanguage";
import { LANGUAGES } from "../i18n/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="lang" role="group" aria-label={t("nav.language")}>
      {LANGUAGES.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          className={code === language ? "lang__btn lang__btn--active" : "lang__btn"}
          aria-pressed={code === language}
          title={name}
          lang={code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}