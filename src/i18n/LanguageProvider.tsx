import { useEffect, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LanguageContext, type LanguageContextValue } from "./languageContext";
import { translate, type Language } from "./translations";

export default function LanguageProvider({ children }: { children: ReactNode }) {
  // Valt språk sparas i localStorage
  const [language, setLanguage] = useLocalStorage<Language>("questlog-language", "en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, vars) => translate(language, key, vars),
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}