import ErrorMessage from "../components/ErrorMessage";
import FilterBar from "../components/FilterBar";
import GameList from "../components/GameList";
import Loading from "../components/Loading";
import { useGames } from "../hooks/useGames";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { StatusFilter } from "../types";

export default function GamesPage() {
  const { t } = useLanguage();
  // VG: valt filter sparas i localStorage och finns kvar nästa gång
  const [filter, setFilter] = useLocalStorage<StatusFilter>("questlog-filter", "all");
  const { data: games, loading, error, reload } = useGames(filter);

  return (
    <section>
      <div className="page-head">
        <h1>{t("games.title")}</h1>
        {games && !loading && (
          <p className="page-head__count">{t("games.count", { count: games.length })}</p>
        )}
      </div>

      <FilterBar value={filter} onChange={setFilter} />

      {loading && <Loading text={t("loading.games")} />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {!loading && !error && games && <GameList games={games} />}
    </section>
  );
}