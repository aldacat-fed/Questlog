import ErrorMessage from "../components/ErrorMessage";
import FilterBar  from "../components/FilterBar";
import GameList from "../components/GameList";
import Loading from "../components/Loading";
import { useGames } from "../hooks/useGames";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { StatusFilter } from "../types";

export default function GamesPage() {
    const [filter, setFilter] = useLocalStorage<StatusFilter>("questlog-filter", "all");
    const { data: games, loading, error, reload } = useGames(filter);

    return (
    <section>
      <div className="page-head">
        <h1>Your backlog</h1>
        {games && !loading && <p className="page-head__count">{games.length} games</p>}
      </div>

      <FilterBar value={filter} onChange={setFilter} />

      {loading && <Loading text="Loading games..." />}
      {error && <ErrorMessage message={error} onRetry={reload} />}
      {!loading && !error && games && <GameList games={games} />}
    </section>
  );
}